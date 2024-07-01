import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import PlayerInfo from '#lostcity/network/outgoing/model/PlayerInfo.js';
import World from '#lostcity/engine/World.js';
import {Position} from '#lostcity/entity/Position.js';
import Player from '#lostcity/entity/Player.js';
import PlayerStat from '#lostcity/entity/PlayerStat.js';
import BuildArea from '#lostcity/entity/BuildArea.js';

export default class PlayerInfoEncoder extends MessageEncoder<PlayerInfo> {
    private static readonly BITS_NEW: number = 11 + 5 + 5 + 1 + 1 + 11;
    private static readonly BITS_RUN: number = 2 + 3 + 3 + 1 + 1;
    private static readonly BITS_WALK: number = 2 + 3 + 1 + 1;
    private static readonly BITS_EXTENDED: number = 2 + 1;
    private static readonly INFO_LIMIT: number = 5000;

    prot = ServerProt.PLAYER_INFO;

    encode(buf: Packet, message: PlayerInfo): void {
        const player: Player = message.player;
        const buildArea: BuildArea = player.buildArea;
        buildArea.resize();
        this.writeLocalPlayer(buf, player);
        this.writePlayers(buf, player);
        this.writeNewPlayers(buf, player);

        if (buildArea.extendedInfo.size > 0) {
            for (const {id, added} of buildArea.extendedInfo) {
                const other: Player | null = World.getPlayerByUid(id);
                if (!other) {
                    continue;
                }
                this.writeUpdate(other, player, buf, id === player.uid, added);
            }
        }
        buildArea.extendedInfo.clear();
    }

    private writeLocalPlayer(bitBlock: Packet, player: Player): void {
        bitBlock.bits();
        bitBlock.pBit(1, player.tele || player.walkDir !== -1 || player.runDir !== -1 || player.mask > 0 ? 1 : 0);
        if (player.tele) {
            bitBlock.pBit(2, 3);
            bitBlock.pBit(2, player.level);
            bitBlock.pBit(7, Position.local(player.x));
            bitBlock.pBit(7, Position.local(player.z));
            bitBlock.pBit(1, player.jump ? 1 : 0);
            bitBlock.pBit(1, player.mask > 0 ? 1 : 0);
        } else if (player.runDir !== -1) {
            bitBlock.pBit(2, 2);
            bitBlock.pBit(3, player.walkDir);
            bitBlock.pBit(3, player.runDir);
            bitBlock.pBit(1, player.mask > 0 ? 1 : 0);
        } else if (player.walkDir !== -1) {
            bitBlock.pBit(2, 1);
            bitBlock.pBit(3, player.walkDir);
            bitBlock.pBit(1, player.mask > 0 ? 1 : 0);
        } else if (player.mask > 0) {
            bitBlock.pBit(2, 0);
        }

        if (player.mask > 0) {
            player.buildArea.extendedInfo.add({id: player.uid, added: false});
        }
    }

    private writePlayers(bitBlock: Packet, player: Player): void {
        const buildArea: BuildArea = player.buildArea;
        // update other players (255 max - 8 bits)
        bitBlock.pBit(8, buildArea.players.size);

        let accumulator: number = 0;
        for (const uid of buildArea.players) {
            const other: Player | null = World.getPlayerByUid(uid);
            if (!other || other.tele || other.level !== player.level || !Position.isWithinDistanceSW(player, other, buildArea.viewDistance) || !other.checkLifeCycle(World.currentTick)) {
                // player full teleported, so needs to be removed and re-added
                bitBlock.pBit(1, 1);
                bitBlock.pBit(2, 3);
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
            if ((bitBlock.bitPos + bits + 7 >>> 3) + bitBlock.pos + (accumulator += this.calculateUpdateSize(other, false, false)) > PlayerInfoEncoder.INFO_LIMIT) {
                extendedInfo = false;
            }

            bitBlock.pBit(1, walkDir !== -1 || runDir !== -1 || extendedInfo ? 1 : 0);
            if (runDir !== -1) {
                bitBlock.pBit(2, 2);
                bitBlock.pBit(3, walkDir);
                bitBlock.pBit(3, runDir);
                bitBlock.pBit(1, extendedInfo ? 1 : 0);
            } else if (walkDir !== -1) {
                bitBlock.pBit(2, 1);
                bitBlock.pBit(3, walkDir);
                bitBlock.pBit(1, extendedInfo ? 1 : 0);
            } else if (extendedInfo) {
                bitBlock.pBit(2, 0);
            }

            if (extendedInfo) {
                player.buildArea.extendedInfo.add({id: uid, added: false});
            }
        }
    }

    private writeNewPlayers(bitBlock: Packet, player: Player): void {
        const buildArea: BuildArea = player.buildArea;
        let accumulator: number = 0;
        for (const other of buildArea.getNearbyPlayers(player)) {
            // todo: tele optimization (not re-sending appearance block for recently observed players (they stay in memory))

            if ((bitBlock.bitPos + PlayerInfoEncoder.BITS_NEW + 7 >>> 3) + bitBlock.pos + (accumulator += this.calculateUpdateSize(other, false, true)) > PlayerInfoEncoder.INFO_LIMIT) {
                // more players get added next tick
                break;
            }

            bitBlock.pBit(11, other.pid);
            bitBlock.pBit(5, other.x - player.x);
            bitBlock.pBit(5, other.z - player.z);
            bitBlock.pBit(1, other.jump ? 1 : 0);
            bitBlock.pBit(1, 1/*hasInitialUpdate ? 1 : 0*/);

            player.buildArea.extendedInfo.add({id: other.uid, added: true});
            buildArea.players.add(other.uid);
        }

        if (player.buildArea.extendedInfo.size > 0) {
            bitBlock.pBit(11, 2047);
        }
        bitBlock.bytes();
    }

    private writeUpdate(player: Player, observer: Player, out: Packet, self: boolean = false, newlyObserved: boolean = false): void {
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

        out.p1(mask & 0xff);
        if (mask & Player.BIG_UPDATE) {
            out.p1(mask >> 8);
        }

        if (mask & Player.APPEARANCE) {
            out.p1(player.appearance!.length);
            out.pdata(player.appearance!, 0, player.appearance!.length);
        }

        if (mask & Player.ANIM) {
            out.p2(player.animId);
            out.p1(player.animDelay);
        }

        if (mask & Player.FACE_ENTITY) {
            if (player.faceEntity !== -1) {
                player.alreadyFacedEntity = true;
            }

            out.p2(player.faceEntity);
        }

        if (mask & Player.SAY) {
            out.pjstr(player.chat);
        }

        if (mask & Player.DAMAGE) {
            out.p1(player.damageTaken);
            out.p1(player.damageType);
            out.p1(player.levels[PlayerStat.HITPOINTS]);
            out.p1(player.baseLevels[PlayerStat.HITPOINTS]);
        }

        if (mask & Player.FACE_COORD) {
            if (player.faceX !== -1) {
                player.alreadyFacedCoord = true;
            }

            if (newlyObserved && player.faceX !== -1) {
                out.p2(player.faceX);
                out.p2(player.faceZ);
            } else if (newlyObserved && player.orientation !== -1) {
                const faceX: number = Position.moveX(player.x, player.orientation);
                const faceZ: number = Position.moveZ(player.z, player.orientation);
                out.p2(faceX * 2 + 1);
                out.p2(faceZ * 2 + 1);
            } else {
                out.p2(player.faceX);
                out.p2(player.faceZ);
            }
        }

        if (mask & Player.CHAT) {
            out.p1(player.messageColor!);
            out.p1(player.messageEffect!);
            out.p1(player.messageType!);

            out.p1(player.message!.length);
            out.pdata(player.message!, 0, player.message!.length);
        }

        if (mask & Player.SPOTANIM) {
            out.p2(player.graphicId);
            out.p2(player.graphicHeight);
            out.p2(player.graphicDelay);
        }

        if (mask & Player.EXACT_MOVE) {
            out.p1(player.exactStartX - Position.zoneOrigin(observer.originX));
            out.p1(player.exactStartZ - Position.zoneOrigin(observer.originZ));
            out.p1(player.exactEndX - Position.zoneOrigin(observer.originX));
            out.p1(player.exactEndZ - Position.zoneOrigin(observer.originZ));
            out.p2(player.exactMoveStart);
            out.p2(player.exactMoveEnd);
            out.p1(player.exactMoveDirection);
        }
    }

    private calculateUpdateSize(player: Player, self: boolean = false, newlyObserved: boolean = false): number {
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
            length += player.chat?.length ?? 0;
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