import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import NpcInfo from '#lostcity/network/outgoing/model/NpcInfo.js';
import World from '#lostcity/engine/World.js';
import {Position} from '#lostcity/entity/Position.js';
import NpcStat from '#lostcity/entity/NpcStat.js';
import Npc from '#lostcity/entity/Npc.js';
import BuildArea, {ExtendedInfo} from '#lostcity/entity/BuildArea.js';

export default class NpcInfoEncoder extends MessageEncoder<NpcInfo> {
    private static readonly BITS_NEW: number = 13 + 11 + 5 + 5 + 1;
    private static readonly BITS_RUN: number = 1 + 2 + 3 + 3 + 1;
    private static readonly BITS_WALK: number = 1 + 2 + 3 + 1;
    private static readonly BITS_EXTENDED: number = 1 + 2;
    private static readonly BYTES_LIMIT: number = 4997;

    prot = ServerProt.NPC_INFO;

    encode(buf: Packet, message: NpcInfo): void {
        const buildArea: BuildArea = message.buildArea;

        this.writeNpcs(buf, message);
        this.writeNewNpcs(buf, message);

        const extended: Set<ExtendedInfo> = buildArea.extendedInfo;
        if (extended.size > 0) {
            for (const info of extended) {
                const npc: Npc | undefined = World.getNpc(info.id);
                if (!npc) {
                    // if this case gets hit... probably expect a disconnect
                    continue;
                }
                this.writeUpdate(npc, buf, info.added);
            }
        }

        buildArea.clearExtended();
    }

    test(_: NpcInfo): number {
        return NpcInfoEncoder.BYTES_LIMIT;
    }

    private writeNpcs(buf: Packet, message: NpcInfo): void {
        const buildArea: BuildArea = message.buildArea;
        // update existing npcs (255 max - 8 bits)
        buf.bits();
        buf.pBit(8, buildArea.npcs.size);

        for (const nid of buildArea.npcs) {
            const npc: Npc | undefined = World.getNpc(nid);
            if (!npc || npc.tele || npc.level !== message.level || !Position.isWithinDistanceSW(message, npc, 16) || !npc.checkLifeCycle(World.currentTick)) {
                // npc full teleported, so needs to be removed and re-added
                buf.pBit(1, 1);
                buf.pBit(2, 3);
                buildArea.npcs.delete(nid);
                continue;
            }

            let extendedInfo: boolean = npc.mask > 0;
            const {walkDir, runDir} = npc;
            let bits: number = 0;
            if (runDir !== -1) {
                bits = NpcInfoEncoder.BITS_RUN;
            } else if (walkDir !== -1) {
                bits = NpcInfoEncoder.BITS_WALK;
            } else if (extendedInfo) {
                bits = NpcInfoEncoder.BITS_EXTENDED;
            }

            const updateSize: number = extendedInfo ? this.calculateExtendedInfo(npc, false) : 0;
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
                buildArea.extendedInfo.add({id: nid, added: false});
            }
        }
    }

    private writeNewNpcs(buf: Packet, message: NpcInfo): void {
        const buildArea: BuildArea = message.buildArea;
        for (const npc of buildArea.getNearbyNpcs(message.x, message.z, message.originX, message.originZ)) {
            const extendedInfo: boolean = npc.mask > 0 || npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ !== -1 || npc.faceEntity !== -1;

            const updateSize: number = extendedInfo ? this.calculateExtendedInfo(npc, true) : 0;
            if (((buf.bitPos + NpcInfoEncoder.BITS_NEW + 13) >>> 3) + (message.accumulator += updateSize) > this.test(message)) {
                // more npcs get added next tick
                break;
            }

            buf.pBit(13, npc.nid);
            buf.pBit(11, npc.type);
            buf.pBit(5, npc.x - message.x);
            buf.pBit(5, npc.z - message.z);
            buf.pBit(1, extendedInfo ? 1 : 0);

            if (extendedInfo) {
                buildArea.extendedInfo.add({id: npc.nid, added: true});
            }

            buildArea.npcs.add(npc.nid);
        }

        if (buildArea.extendedInfo.size > 0) {
            buf.pBit(13, 8191);
        }

        buf.bytes();
    }

    private writeUpdate(npc: Npc, buf: Packet, newlyObserved: boolean): void {
        let mask: number = npc.mask;
        if (newlyObserved && (npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ != -1)) {
            mask |= Npc.FACE_COORD;
        }
        if (newlyObserved && npc.faceEntity !== -1) {
            mask |= Npc.FACE_ENTITY;
        }
        buf.p1(mask);

        if (mask & Npc.ANIM) {
            buf.p2(npc.animId);
            buf.p1(npc.animDelay);
        }

        if (mask & Npc.FACE_ENTITY) {
            if (npc.faceEntity !== -1) {
                npc.alreadyFacedEntity = true;
            }

            buf.p2(npc.faceEntity);
        }

        if (mask & Npc.SAY) {
            buf.pjstr(npc.chat ?? '');
        }

        if (mask & Npc.DAMAGE) {
            buf.p1(npc.damageTaken);
            buf.p1(npc.damageType);
            buf.p1(npc.levels[NpcStat.HITPOINTS]);
            buf.p1(npc.baseLevels[NpcStat.HITPOINTS]);
        }

        if (mask & Npc.CHANGE_TYPE) {
            buf.p2(npc.type);
        }

        if (mask & Npc.SPOTANIM) {
            buf.p2(npc.graphicId);
            buf.p2(npc.graphicHeight);
            buf.p2(npc.graphicDelay);
        }

        if (mask & Npc.FACE_COORD) {
            if (npc.faceX !== -1) {
                npc.alreadyFacedCoord = true;
            }

            if (newlyObserved && npc.faceX != -1) {
                buf.p2(npc.faceX);
                buf.p2(npc.faceZ);
            } else if (newlyObserved && npc.orientation != -1) {
                const faceX: number = Position.moveX(npc.x, npc.orientation);
                const faceZ: number = Position.moveZ(npc.z, npc.orientation);
                buf.p2(faceX * 2 + 1);
                buf.p2(faceZ * 2 + 1);
            } else {
                buf.p2(npc.faceX);
                buf.p2(npc.faceZ);
            }
        }
    }

    private calculateExtendedInfo(npc: Npc, newlyObserved: boolean): number {
        let length: number = 0;
        let mask: number = npc.mask;
        if (newlyObserved && (npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ != -1)) {
            mask |= Npc.FACE_COORD;
        }
        if (newlyObserved && npc.faceEntity !== -1) {
            mask |= Npc.FACE_ENTITY;
        }
        length += 1;

        if (mask & Npc.ANIM) {
            length += 3;
        }

        if (mask & Npc.FACE_ENTITY) {
            length += 2;
        }

        if (mask & Npc.SAY) {
            length += npc.chat ? npc.chat.length + 1 : 1;
        }

        if (mask & Npc.DAMAGE) {
            length += 4;
        }

        if (mask & Npc.CHANGE_TYPE) {
            length += 2;
        }

        if (mask & Npc.SPOTANIM) {
            length += 6;
        }

        if (mask & Npc.FACE_COORD) {
            length += 4;
        }

        return length;
    }
}