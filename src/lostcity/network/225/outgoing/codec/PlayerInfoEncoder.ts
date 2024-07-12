import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import PlayerInfo from '#lostcity/network/outgoing/model/PlayerInfo.js';
import World from '#lostcity/engine/World.js';
import {Position} from '#lostcity/entity/Position.js';
import Player from '#lostcity/entity/Player.js';
import PlayerStat from '#lostcity/entity/PlayerStat.js';
import BuildArea, {ExtendedInfo} from '#lostcity/entity/BuildArea.js';

export default class PlayerInfoEncoder extends MessageEncoder<PlayerInfo> {
    private static readonly BITS_NEW: number = 11 + 5 + 5 + 1 + 1;
    private static readonly BITS_RUN: number = 1 + 2 + 3 + 3 + 1 + 1;
    private static readonly BITS_WALK: number = 1 + 2 + 3 + 1 + 1;
    private static readonly BITS_EXTENDED: number = 1 + 2;
    private static readonly BYTES_LIMIT: number = 4997;

    prot = ServerProt.PLAYER_INFO;

    encode(buf: Packet, message: PlayerInfo): void {
        const buildArea: BuildArea = message.buildArea;
        buildArea.resize();

        this.writeLocalPlayer(buf, message);
        this.writePlayers(buf, message);
        this.writeNewPlayers(buf, message);

        const extended: Set<ExtendedInfo> = buildArea.extendedInfo;
        if (extended.size > 0) {
            for (const info of extended) {
                const other: Player | null = World.getPlayerByUid(info.id);
                if (!other) {
                    // if this case gets hit... probably expect a disconnect
                    continue;
                }
                this.writeUpdate(other, message, buf, info.id === message.uid, info.added);
            }
        }

        buildArea.clearExtended();
    }

    test(_: PlayerInfo): number {
        return PlayerInfoEncoder.BYTES_LIMIT;
    }

    private writeLocalPlayer(buf: Packet, message: PlayerInfo): void {
        const {buildArea, uid, level, x, z, mask, tele, jump, walkDir, runDir} = message;
        const player: Player | null = World.getPlayerByUid(uid);
        if (!player) {
            return;
        }

        const extendedInfo: boolean = mask > 0;

        buf.bits();
        buf.pBit(1, tele || runDir !== -1 || walkDir !== -1 || extendedInfo ? 1 : 0);
        if (tele) {
            buf.pBit(2, 3);
            buf.pBit(2, level);
            buf.pBit(7, Position.local(x, player.originX));
            buf.pBit(7, Position.local(z, player.originZ));
            buf.pBit(1, jump ? 1 : 0);
            buf.pBit(1, extendedInfo ? 1 : 0);
        } else if (runDir !== -1) {
            buf.pBit(2, 2);
            buf.pBit(3, walkDir);
            buf.pBit(3, runDir);
            buf.pBit(1, extendedInfo ? 1 : 0);
        } else if (walkDir !== -1) {
            buf.pBit(2, 1);
            buf.pBit(3, walkDir);
            buf.pBit(1, extendedInfo ? 1 : 0);
        } else if (extendedInfo) {
            buf.pBit(2, 0);
        }

        if (extendedInfo) {
            buildArea.extendedInfo.add({id: uid, added: false});
            message.accumulator += this.calculateExtendedInfo(player, message, true, true);
        }
    }

    private writePlayers(buf: Packet, message: PlayerInfo): void {
        const buildArea: BuildArea = message.buildArea;
        // update other players (255 max - 8 bits)
        buf.pBit(8, buildArea.players.size);

        for (const uid of buildArea.players) {
            const other: Player | null = World.getPlayerByUid(uid);
            if (!other || other.tele || other.level !== message.level || !Position.isWithinDistanceSW(message, other, buildArea.viewDistance) || !other.checkLifeCycle(World.currentTick)) {
                // player full teleported, so needs to be removed and re-added
                buf.pBit(1, 1);
                buf.pBit(2, 3);
                buildArea.players.delete(uid);
                continue;
            }

            let extendedInfo: boolean = other.mask > 0;
            const {walkDir, runDir} = other;
            let bits: number = 0;
            if (runDir !== -1) {
                bits = PlayerInfoEncoder.BITS_RUN;
            } else if (walkDir !== -1) {
                bits = PlayerInfoEncoder.BITS_WALK;
            } else if (extendedInfo) {
                bits = PlayerInfoEncoder.BITS_EXTENDED;
            }

            const updateSize: number = extendedInfo ? this.calculateExtendedInfo(other, message, false, false) : 0;
            if (((buf.bitPos + bits) >>> 3) + (message.accumulator += updateSize) > this.test(message)) {
                extendedInfo = false;
            }

            buf.pBit(1, runDir !== -1 || walkDir !== -1 || extendedInfo ? 1 : 0);
            if (runDir !== -1) {
                buf.pBit(2, 2);
                buf.pBit(3, walkDir);
                buf.pBit(3, runDir);
                buf.pBit(1, extendedInfo ? 1 : 0);
            } else if (walkDir !== -1) {
                buf.pBit(2, 1);
                buf.pBit(3, walkDir);
                buf.pBit(1, extendedInfo ? 1 : 0);
            } else if (extendedInfo) {
                buf.pBit(2, 0);
            }

            if (extendedInfo) {
                buildArea.extendedInfo.add({id: uid, added: false});
            }
        }
    }

    private writeNewPlayers(buf: Packet, message: PlayerInfo): void {
        const buildArea: BuildArea = message.buildArea;
        for (const other of buildArea.getNearbyPlayers(message.uid, message.x, message.z, message.originX, message.originZ)) {
            const extendedInfo: boolean = !buildArea.hasAppearance(other.pid, other.lastAppearance);

            const updateSize: number = extendedInfo ? this.calculateExtendedInfo(other, message, false, true) : 0;
            if (((buf.bitPos + PlayerInfoEncoder.BITS_NEW + 11) >>> 3) + (message.accumulator += updateSize) > this.test(message)) {
                // more players get added next tick
                break;
            }

            buf.pBit(11, other.pid);
            buf.pBit(5, other.x - message.x);
            buf.pBit(5, other.z - message.z);
            buf.pBit(1, other.jump ? 1 : 0);
            buf.pBit(1, extendedInfo ? 1 : 0);

            if (extendedInfo) {
                buildArea.extendedInfo.add({id: other.uid, added: true});
            }

            buildArea.players.add(other.uid);
        }

        if (buildArea.extendedInfo.size > 0) {
            buf.pBit(11, 2047);
        }

        buf.bytes();
    }

    private writeUpdate(player: Player, message: PlayerInfo, buf: Packet, self: boolean = false, newlyObserved: boolean = false): void {
        let mask: number = player.mask;
        if (newlyObserved) {
            mask |= Player.APPEARANCE;
        }
        if (newlyObserved && (player.orientation !== -1 || player.faceX !== -1 || player.faceZ !== -1)) {
            mask |= Player.FACE_COORD;
        }
        if (newlyObserved && player.faceEntity !== -1) {
            mask |= Player.FACE_ENTITY;
        }

        if (mask > 0xff) {
            mask |= Player.BIG_UPDATE;
        }

        if (self && mask & Player.CHAT) {
            // don't echo back local chat
            mask &= ~Player.CHAT;
        }

        if (message.buildArea.hasAppearance(player.pid, player.lastAppearance)) {
            mask &= ~Player.APPEARANCE;
        }

        buf.p1(mask & 0xff);
        if (mask & Player.BIG_UPDATE) {
            buf.p1(mask >> 8);
        }

        if (mask & Player.APPEARANCE) {
            buf.p1(player.appearance!.length);
            buf.pdata(player.appearance!, 0, player.appearance!.length);
            message.buildArea.saveAppearance(player.pid, player.lastAppearance);
        }

        if (mask & Player.ANIM) {
            buf.p2(player.animId);
            buf.p1(player.animDelay);
        }

        if (mask & Player.FACE_ENTITY) {
            if (player.faceEntity !== -1) {
                player.alreadyFacedEntity = true;
            }

            buf.p2(player.faceEntity);
        }

        if (mask & Player.SAY) {
            buf.pjstr(player.chat ?? '');
        }

        if (mask & Player.DAMAGE) {
            buf.p1(player.damageTaken);
            buf.p1(player.damageType);
            buf.p1(player.levels[PlayerStat.HITPOINTS]);
            buf.p1(player.baseLevels[PlayerStat.HITPOINTS]);
        }

        if (mask & Player.FACE_COORD) {
            if (player.faceX !== -1) {
                player.alreadyFacedCoord = true;
            }

            if (newlyObserved && player.faceX !== -1) {
                buf.p2(player.faceX);
                buf.p2(player.faceZ);
            } else if (newlyObserved && player.orientation !== -1) {
                const faceX: number = Position.moveX(player.x, player.orientation);
                const faceZ: number = Position.moveZ(player.z, player.orientation);
                buf.p2(faceX * 2 + 1);
                buf.p2(faceZ * 2 + 1);
            } else {
                buf.p2(player.faceX);
                buf.p2(player.faceZ);
            }
        }

        if (mask & Player.CHAT) {
            buf.p1(player.messageColor!);
            buf.p1(player.messageEffect!);
            buf.p1(player.messageType!);

            buf.p1(player.message!.length);
            buf.pdata(player.message!, 0, player.message!.length);
        }

        if (mask & Player.SPOTANIM) {
            buf.p2(player.graphicId);
            buf.p2(player.graphicHeight);
            buf.p2(player.graphicDelay);
        }

        if (mask & Player.EXACT_MOVE) {
            buf.p1(player.exactStartX - Position.zoneOrigin(message.originX));
            buf.p1(player.exactStartZ - Position.zoneOrigin(message.originZ));
            buf.p1(player.exactEndX - Position.zoneOrigin(message.originX));
            buf.p1(player.exactEndZ - Position.zoneOrigin(message.originZ));
            buf.p2(player.exactMoveStart);
            buf.p2(player.exactMoveEnd);
            buf.p1(player.exactMoveDirection);
        }
    }

    private calculateExtendedInfo(player: Player, message: PlayerInfo, self: boolean = false, newlyObserved: boolean = false): number {
        let length: number = 0;
        let mask: number = player.mask;
        if (newlyObserved) {
            mask |= Player.APPEARANCE;
        }
        if (newlyObserved && (player.orientation !== -1 || player.faceX !== -1 || player.faceZ !== -1)) {
            mask |= Player.FACE_COORD;
        }
        if (newlyObserved && player.faceEntity !== -1) {
            mask |= Player.FACE_ENTITY;
        }

        if (mask > 0xff) {
            mask |= Player.BIG_UPDATE;
        }

        if (self && mask & Player.CHAT) {
            // don't echo back local chat
            mask &= ~Player.CHAT;
        }

        if (message.buildArea.hasAppearance(player.pid, player.lastAppearance)) {
            mask &= ~Player.APPEARANCE;
        }

        length += 1;
        if (mask & Player.BIG_UPDATE) {
            length += 1;
        }

        if (mask & Player.APPEARANCE) {
            length += 1;
            length += player.appearance?.length ?? 0;
        }

        if (mask & Player.ANIM) {
            length += 3;
        }

        if (mask & Player.FACE_ENTITY) {
            length += 2;
        }

        if (mask & Player.SAY) {
            length += (player.chat?.length ?? 0) + 1;
        }

        if (mask & Player.DAMAGE) {
            length += 4;
        }

        if (mask & Player.FACE_COORD) {
            length += 4;
        }

        if (mask & Player.CHAT) {
            length += 4;
            length += player.message?.length ?? 0;
        }

        if (mask & Player.SPOTANIM) {
            length += 6;
        }

        if (mask & Player.EXACT_MOVE) {
            length += 9;
        }

        return length;
    }
}