import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import PlayerInfo from '#/network/server/model/PlayerInfo.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import BuildArea from '#/engine/entity/BuildArea.js';
import Player from '#/engine/entity/Player.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoFaceEntity from '#/network/server/model/PlayerInfoFaceEntity.js';
import PlayerInfoFaceCoord from '#/network/server/model/PlayerInfoFaceCoord.js';
import PlayerRenderer from '#/engine/renderer/PlayerRenderer.js';
import Visibility from '#/engine/entity/Visibility.js';
import Renderer from '#/engine/renderer/Renderer.js';

export default class PlayerInfoEncoder extends MessageEncoder<PlayerInfo> {
    prot = ServerProt.PLAYER_INFO;

    encode(buf: Packet, message: PlayerInfo): void {
        const buildArea: BuildArea = message.player.buildArea;

        if (message.changedLevel || message.deltaX > buildArea.viewDistance || message.deltaZ > buildArea.viewDistance) {
            // optimization to avoid sending 3 bits * observed players when everything has to be removed anyways
            buildArea.players.clear();
            buildArea.lastResize = 0;
            buildArea.viewDistance = BuildArea.PREFERRED_VIEW_DISTANCE;
        } else {
            buildArea.resize();
        }

        const updates: Packet = Packet.alloc(1);
        buf.bits();
        const bytes1: number = this.writeLocalPlayer(buf, updates, message);
        const bytes2: number = this.writePlayers(buf, updates, message, bytes1);
        this.writeNewPlayers(buf, updates, message, bytes2);
        if (updates.pos > 0) {
            buf.pBit(11, 2047);
            buf.bytes();
            buf.pdata(updates.data, 0, updates.pos);
        } else {
            buf.bytes();
        }
        updates.release();
    }

    test(_: PlayerInfo): number {
        return Renderer.MAX_BYTES;
    }

    private writeLocalPlayer(buf: Packet, updates: Packet, message: PlayerInfo): number {
        const { renderer, player } = message;
        let length: number;
        if (player.tele) {
            length = renderer.writeTeleport(buf, player.pid, player.x, player.level, player.z, player.originX, player.originZ, player.jump);
        } else {
            length = renderer.writeBits(buf, player.pid, 0);
        }
        if (length > 0) {
            this.highdefinition(updates, renderer, player, player);
        }
        return length;
    }

    private writePlayers(buf: Packet, updates: Packet, message: PlayerInfo, bytes: number): number {
        const { currentTick, renderer, player } = message;
        const buildArea: BuildArea = player.buildArea;
        // update other players (255 max - 8 bits)
        buf.pBit(8, buildArea.players.size);
        for (const other of buildArea.players) {
            const pid: number = other.pid;
            if (pid === -1 || other.tele || other.level !== player.level || !CoordGrid.isWithinDistanceSW(player, other, buildArea.viewDistance) || !other.checkLifeCycle(currentTick) || other.visibility === Visibility.HARD) {
                // if the player was teleported, they need to be removed and re-added
                renderer.remove(buf);
                buildArea.players.delete(other);
                continue;
            }
            const length: number = renderer.writeBits(buf, pid, bytes);
            if (length > 0) {
                this.highdefinition(updates, renderer, player, other);
                bytes += length;
            }
        }
        return bytes;
    }

    private writeNewPlayers(buf: Packet, updates: Packet, message: PlayerInfo, bytes: number): void {
        const { renderer, player } = message;
        const { buildArea, pid, level, x, z } = player;
        for (const other of buildArea.getNearbyPlayers(pid, level, x, z)) {
            if (other.visibility === Visibility.HARD) {
                continue;
            }

            const pid: number = other.pid;
            const length: number = renderer.lowdefinitions(pid) + renderer.highdefinitions(pid);
            // bits to add player + extended info size + bits to break loop (11)
            if (!renderer.space(bytes, buf, Renderer.PLAYER_ADD_BITS + 11, length)) {
                // more players get added next tick
                break;
            }
            renderer.addPlayer(buf, pid, other.x - x, other.z - z, other.jump);
            this.lowdefinition(updates, renderer, player, other);
            buildArea.players.add(other);
            bytes += length;
        }
    }

    private highdefinition(updates: Packet, renderer: PlayerRenderer, player: Player, other: Player): void {
        const self: boolean = player.pid === other.pid;
        let masks: number = other.masks;
        if (self) {
            masks &= ~InfoProt.PLAYER_CHAT.id;
        }
        this.writeBlocks(updates, renderer, player, other, other.pid, masks, self);
    }

    private lowdefinition(updates: Packet, renderer: PlayerRenderer, player: Player, other: Player): void {
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
            if (other.faceX !== -1) {
                renderer.cache(pid, new PlayerInfoFaceCoord(other.faceX, other.faceZ), InfoProt.PLAYER_FACE_COORD);
            } else if (other.orientationX !== -1) {
                renderer.cache(pid, new PlayerInfoFaceCoord(other.orientationX, other.orientationZ), InfoProt.PLAYER_FACE_COORD);
            } else {
                // this is a fail safe but should not happen.
                renderer.cache(pid, new PlayerInfoFaceCoord(CoordGrid.fine(other.x, 1), CoordGrid.fine(other.z - 1, 1)), InfoProt.PLAYER_FACE_COORD);
            }
        }

        masks |= InfoProt.PLAYER_FACE_COORD.id;

        this.writeBlocks(updates, renderer, player, other, pid, masks, false);
    }

    private writeBlocks(updates: Packet, renderer: PlayerRenderer, player: Player, other: Player, pid: number, masks: number, self: boolean): void {
        renderer.write2(updates, masks, InfoProt.PLAYER_BIG_UPDATE.id);
        if (masks & InfoProt.PLAYER_APPEARANCE.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_APPEARANCE);
        }
        if (masks & InfoProt.PLAYER_ANIM.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_ANIM);
        }
        if (masks & InfoProt.PLAYER_FACE_ENTITY.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_FACE_ENTITY);
        }
        if (masks & InfoProt.PLAYER_SAY.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_SAY);
        }
        if (masks & InfoProt.PLAYER_DAMAGE.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_DAMAGE);
        }
        if (masks & InfoProt.PLAYER_FACE_COORD.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_FACE_COORD);
        }
        if (!self && masks & InfoProt.PLAYER_CHAT.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_CHAT);
        }
        if (masks & InfoProt.PLAYER_SPOTANIM.id) {
            renderer.write(updates, pid, InfoProt.PLAYER_SPOTANIM);
        }
        if (masks & InfoProt.PLAYER_EXACT_MOVE.id) {
            const x: number = CoordGrid.zoneOrigin(player.originX);
            const z: number = CoordGrid.zoneOrigin(player.originZ);
            renderer.writeExactmove(
                updates,
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
}