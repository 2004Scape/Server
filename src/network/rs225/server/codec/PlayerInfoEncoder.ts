import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import PlayerInfo from '#/network/server/model/PlayerInfo.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import BuildArea from '#/engine/entity/BuildArea.js';
import Renderer from '#/engine/renderer/Renderer.js';
import Player from '#/engine/entity/Player.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoFaceEntity from '#/network/server/model/PlayerInfoFaceEntity.js';
import PlayerInfoFaceCoord from '#/network/server/model/PlayerInfoFaceCoord.js';
import PlayerRenderer from '#/engine/renderer/PlayerRenderer.js';

export default class PlayerInfoEncoder extends MessageEncoder<PlayerInfo> {
    private static readonly BITS_NEW: number = 11 + 5 + 5 + 1 + 1;
    private static readonly BITS_RUN: number = 1 + 2 + 3 + 3 + 1;
    private static readonly BITS_WALK: number = 1 + 2 + 3 + 1;
    private static readonly BITS_EXTENDED: number = 1 + 2;
    private static readonly BYTES_LIMIT: number = 4997;

    prot = ServerProt.PLAYER_INFO;

    encode(buf: Packet, message: PlayerInfo): void {
        const player = message.player;
        const buildArea: BuildArea = player.buildArea;

        if (message.changedLevel || message.deltaX > buildArea.viewDistance || message.deltaZ > buildArea.viewDistance) {
            // optimization to avoid sending 3 bits * observed players when everything has to be removed anyways
            buildArea.players.clear();
            buildArea.lastResize = 0;
            buildArea.viewDistance = BuildArea.PREFERRED_VIEW_DISTANCE;
        } else {
            buildArea.resize();
        }

        buf.bits();
        let bytes: number = 0;
        bytes = this.writeLocalPlayer(buf, message, bytes);
        bytes = this.writePlayers(buf, message, bytes);
        this.writeNewPlayers(buf, message, bytes);
        if (buildArea.highPlayers.size > 0 || buildArea.lowPlayers.size > 0) {
            buf.pBit(11, 2047);
        }
        buf.bytes();

        const renderer: PlayerRenderer = message.renderer;
        for (const high of buildArea.highPlayers) {
            this.highdefinition(buf, renderer, player, high, high.pid === player.pid);
        }
        for (const low of buildArea.lowPlayers) {
            this.lowdefinition(buf, renderer, player, low);
        }
        buildArea.clearPlayerInfo();
    }

    test(_: PlayerInfo): number {
        return PlayerInfoEncoder.BYTES_LIMIT;
    }

    private writeLocalPlayer(buf: Packet, message: PlayerInfo, bytes: number): number {
        const { buildArea, pid, tele, runDir, walkDir } = message.player;
        const length: number = message.renderer.highdefinitions(pid);
        const extend: boolean = length > 0;
        if (tele) {
            const { x, z, level, originX, originZ, jump } = message.player;
            this.teleport(buf, buildArea, message.player, CoordGrid.local(x, originX), level, CoordGrid.local(z, originZ), jump, extend);
        } else if (runDir !== -1) {
            this.run(buf, buildArea, message.player, walkDir, runDir, extend);
        } else if (walkDir !== -1) {
            this.walk(buf, buildArea, message.player, walkDir, extend);
        } else if (extend) {
            this.extend(buf, buildArea, message.player);
        } else {
            this.idle(buf);
        }
        return bytes + length;
    }

    private writePlayers(buf: Packet, message: PlayerInfo, bytes: number): number {
        const {currentTick, renderer, player } = message;
        const buildArea: BuildArea = player.buildArea;
        // update other players (255 max - 8 bits)
        buf.pBit(8, buildArea.players.size);
        for (const other of buildArea.players) {
            const pid: number = other.pid;
            if (pid === -1 || other.tele || other.level !== player.level || !CoordGrid.isWithinDistanceSW(player, other, buildArea.viewDistance) || !other.checkLifeCycle(currentTick)) {
                // if the player was teleported, they need to be removed and re-added
                this.remove(buf, buildArea, other);
                continue;
            }
            const length: number = renderer.highdefinitions(pid);
            const extend: boolean = length > 0;
            const { walkDir, runDir } = other;
            if (runDir !== -1) {
                this.run(buf, buildArea, other, walkDir, runDir, extend && this.willFit(bytes, buf, PlayerInfoEncoder.BITS_RUN, length));
            } else if (walkDir !== -1) {
                this.walk(buf, buildArea, other, walkDir, extend && this.willFit(bytes, buf, PlayerInfoEncoder.BITS_WALK, length));
            } else if (extend && this.willFit(bytes, buf, PlayerInfoEncoder.BITS_EXTENDED, length)) {
                this.extend(buf, buildArea, other);
            } else {
                this.idle(buf);
            }
            bytes += length;
        }
        return bytes;
    }

    private writeNewPlayers(buf: Packet, message: PlayerInfo, bytes: number): void {
        const renderer: Renderer<Player> = message.renderer;
        const {buildArea, pid, level, x, z, originX, originZ} = message.player;
        for (const other of buildArea.getNearbyPlayers(pid, level, x, z, originX, originZ)) {
            const pid: number = other.pid;
            const length: number = renderer.lowdefinitions(pid) + renderer.highdefinitions(pid);
            // bits to add player + extended info size + bits to break loop (11)
            if (!this.willFit(bytes, buf, PlayerInfoEncoder.BITS_NEW + 11, length)) {
                // more players get added next tick
                break;
            }
            this.add(buf, buildArea, other, pid, other.x - x, other.z - z, other.jump);
            bytes += length;
        }
    }

    private add(buf: Packet, buildArea: BuildArea, player: Player, pid: number, x: number, z: number, jump: boolean): void {
        buf.pBit(11, pid);
        buf.pBit(5, x);
        buf.pBit(5, z);
        buf.pBit(1, jump ? 1 : 0);
        buf.pBit(1, 1); // extend
        buildArea.lowPlayers.add(player);
        buildArea.players.add(player);
    }

    private remove(buf: Packet, buildArea: BuildArea, player: Player): void {
        buf.pBit(1, 1);
        buf.pBit(2, 3);
        buildArea.players.delete(player);
    }

    private teleport(buf: Packet, buildArea: BuildArea, player: Player, x: number, y: number, z: number, jump: boolean, extend: boolean): void {
        buf.pBit(1, 1);
        buf.pBit(2, 3);
        buf.pBit(2, y);
        buf.pBit(7, x);
        buf.pBit(7, z);
        buf.pBit(1, jump ? 1 : 0);
        if (extend) {
            buf.pBit(1, 1);
            buildArea.highPlayers.add(player);
        } else {
            buf.pBit(1, 0);
        }
    }

    private run(buf: Packet, buildArea: BuildArea, player: Player, walkDir: number, runDir: number, extend: boolean): void {
        buf.pBit(1, 1);
        buf.pBit(2, 2);
        buf.pBit(3, walkDir);
        buf.pBit(3, runDir);
        if (extend) {
            buf.pBit(1, 1);
            buildArea.highPlayers.add(player);
        } else {
            buf.pBit(1, 0);
        }
    }

    private walk(buf: Packet, buildArea: BuildArea, player: Player, walkDir: number, extend: boolean): void {
        buf.pBit(1, 1);
        buf.pBit(2, 1);
        buf.pBit(3, walkDir);
        if (extend) {
            buf.pBit(1, 1);
            buildArea.highPlayers.add(player);
        } else {
            buf.pBit(1, 0);
        }
    }

    private extend(buf: Packet, buildArea: BuildArea, player: Player): void {
        buf.pBit(1, 1);
        buf.pBit(2, 0);
        buildArea.highPlayers.add(player);
    }

    private idle(buf: Packet): void {
        buf.pBit(1, 0);
    }

    private highdefinition(buf: Packet, renderer: PlayerRenderer, player: Player, other: Player, self: boolean): void {
        let masks: number = other.masks;
        if (self) {
            masks &= ~InfoProt.PLAYER_CHAT.id;
        }
        this.writeBlocks(buf, renderer, player, other, other.pid, masks, self);
    }

    private lowdefinition(buf: Packet, renderer: PlayerRenderer, player: Player, other: Player): void {
        const pid: number = other.pid;
        let masks: number = other.masks;

        if (!player.buildArea.hasAppearance(pid, other.lastAppearance)) {
            player.buildArea.saveAppearance(pid, other.lastAppearance);
            masks |= InfoProt.PLAYER_APPEARANCE.id;
        } else {
            masks &= ~InfoProt.PLAYER_APPEARANCE.id;
        }

        if (other.faceEntity !== -1 && !renderer.has(pid, InfoProt.PLAYER_FACE_ENTITY)) {
            renderer.cache(pid, new PlayerInfoFaceEntity(other.faceEntity), InfoProt.PLAYER_FACE_ENTITY);
            masks |= InfoProt.PLAYER_FACE_ENTITY.id;
        }

        if (!renderer.has(pid, InfoProt.PLAYER_FACE_COORD)) {
            if (other.orientationX !== -1) {
                renderer.cache(pid, new PlayerInfoFaceCoord(other.orientationX, other.orientationZ), InfoProt.PLAYER_FACE_COORD);
            } else if (other.faceX !== -1) {
                renderer.cache(pid, new PlayerInfoFaceCoord(other.faceX, other.faceZ), InfoProt.PLAYER_FACE_COORD);
            } else {
                renderer.cache(pid, new PlayerInfoFaceCoord(other.x * 2 + 1, (other.z - 1) * 2 + 1), InfoProt.PLAYER_FACE_COORD);
            }
        }

        masks |= InfoProt.PLAYER_FACE_COORD.id;

        this.writeBlocks(buf, renderer, player, other, pid, masks, false);
    }

    private writeBlocks(buf: Packet, renderer: PlayerRenderer, player: Player, other: Player, pid: number, masks: number, self: boolean): void {
        renderer.write2(buf, masks, InfoProt.PLAYER_BIG_UPDATE.id);
        if (masks & InfoProt.PLAYER_APPEARANCE.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_APPEARANCE);
        }
        if (masks & InfoProt.PLAYER_ANIM.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_ANIM);
        }
        if (masks & InfoProt.PLAYER_FACE_ENTITY.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_FACE_ENTITY);
        }
        if (masks & InfoProt.PLAYER_SAY.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_SAY);
        }
        if (masks & InfoProt.PLAYER_DAMAGE.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_DAMAGE);
        }
        if (masks & InfoProt.PLAYER_FACE_COORD.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_FACE_COORD);
        }
        if (!self && masks & InfoProt.PLAYER_CHAT.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_CHAT);
        }
        if (masks & InfoProt.PLAYER_SPOTANIM.id) {
            renderer.write(buf, pid, InfoProt.PLAYER_SPOTANIM);
        }
        if (masks & InfoProt.PLAYER_EXACT_MOVE.id) {
            const x: number = CoordGrid.zoneOrigin(player.originX);
            const z: number = CoordGrid.zoneOrigin(player.originZ);
            renderer.writeExactmove(
                buf,
                other.exactStartX - x,
                other.exactStartZ - z,
                other.exactEndX - x,
                other.exactEndZ - z,
                other.exactMoveStart,
                other.exactMoveEnd,
                other.exactMoveDirection
            );
        }
    }

    private willFit(bytes: number, buf: Packet, bitsToAdd: number, bytesToAdd: number): boolean {
        // 7 aligns to the next byte
        return ((buf.bitPos + bitsToAdd + 7) >>> 3) + (bytes + bytesToAdd) <= PlayerInfoEncoder.BYTES_LIMIT;
    }
}