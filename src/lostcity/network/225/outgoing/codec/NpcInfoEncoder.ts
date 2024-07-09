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
    private static readonly BITS_RUN: number = 2 + 3 + 3 + 1 + 1;
    private static readonly BITS_WALK: number = 2 + 3 + 1 + 1;
    private static readonly BITS_EXTENDED: number = 2 + 1;
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
                    continue;
                }
                this.writeUpdate(npc, buf, info.added);
            }
        }
        buildArea.reset();
    }

    test(_: NpcInfo): number {
        return NpcInfoEncoder.BYTES_LIMIT;
    }

    private writeNpcs(bitBlock: Packet, message: NpcInfo): void {
        const buildArea: BuildArea = message.buildArea;
        // update existing npcs (255 max - 8 bits)
        bitBlock.bits();
        bitBlock.pBit(8, buildArea.npcs.size);

        for (const nid of buildArea.npcs) {
            const npc: Npc | undefined = World.getNpc(nid);
            if (!npc || npc.tele || npc.level !== message.level || !Position.isWithinDistanceSW(message, npc, 16) || !npc.checkLifeCycle(World.currentTick)) {
                // npc full teleported, so needs to be removed and re-added
                bitBlock.pBit(1, 1);
                bitBlock.pBit(2, 3);
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
            const updateSize: number = extendedInfo ? this.calculateUpdateSize(npc, false) : 0;
            if ((bitBlock.bitPos + bits + 7 + 24 >>> 3) + bitBlock.pos + (message.accumulator += updateSize) > this.test(message)) {
                extendedInfo = false;
            }

            bitBlock.pBit(1, runDir !== -1 || walkDir !== -1 || extendedInfo ? 1 : 0);
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
                buildArea.extendedInfo.add({id: nid, added: false});
            }
        }
    }

    private writeNewNpcs(bitBlock: Packet, message: NpcInfo): void {
        const buildArea: BuildArea = message.buildArea;
        for (const npc of buildArea.getNearbyNpcs(message.x, message.z, message.originX, message.originZ)) {
            const extendedInfo: boolean = npc.mask > 0 || npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ !== -1 || npc.faceEntity !== -1;

            const updateSize: number = extendedInfo ? this.calculateUpdateSize(npc, true) : 0;
            if ((bitBlock.bitPos + NpcInfoEncoder.BITS_NEW + 7 + 24 >>> 3) + bitBlock.pos + (message.accumulator += updateSize) > this.test(message)) {
                // more npcs get added next tick
                break;
            }

            bitBlock.pBit(13, npc.nid);
            bitBlock.pBit(11, npc.type);
            bitBlock.pBit(5, npc.x - message.x);
            bitBlock.pBit(5, npc.z - message.z);
            bitBlock.pBit(1, extendedInfo ? 1 : 0);

            buildArea.npcs.add(npc.nid);

            if (extendedInfo) {
                buildArea.extendedInfo.add({id: npc.nid, added: true});
            }
        }

        if (buildArea.extendedInfo.size > 0) {
            bitBlock.pBit(13, 8191);
        }
        bitBlock.bytes();
    }

    private writeUpdate(npc: Npc, out: Packet, newlyObserved: boolean): void {
        let mask: number = npc.mask;
        if (newlyObserved && (npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ != -1)) {
            mask |= Npc.FACE_COORD;
        }
        if (newlyObserved && npc.faceEntity !== -1) {
            mask |= Npc.FACE_ENTITY;
        }
        out.p1(mask);

        if (mask & Npc.ANIM) {
            out.p2(npc.animId);
            out.p1(npc.animDelay);
        }

        if (mask & Npc.FACE_ENTITY) {
            if (npc.faceEntity !== -1) {
                npc.alreadyFacedEntity = true;
            }

            out.p2(npc.faceEntity);
        }

        if (mask & Npc.SAY) {
            out.pjstr(npc.chat ?? '');
        }

        if (mask & Npc.DAMAGE) {
            out.p1(npc.damageTaken);
            out.p1(npc.damageType);
            out.p1(npc.levels[NpcStat.HITPOINTS]);
            out.p1(npc.baseLevels[NpcStat.HITPOINTS]);
        }

        if (mask & Npc.CHANGE_TYPE) {
            out.p2(npc.type);
        }

        if (mask & Npc.SPOTANIM) {
            out.p2(npc.graphicId);
            out.p2(npc.graphicHeight);
            out.p2(npc.graphicDelay);
        }

        if (mask & Npc.FACE_COORD) {
            if (npc.faceX !== -1) {
                npc.alreadyFacedCoord = true;
            }

            if (newlyObserved && npc.faceX != -1) {
                out.p2(npc.faceX);
                out.p2(npc.faceZ);
            } else if (newlyObserved && npc.orientation != -1) {
                const faceX: number = Position.moveX(npc.x, npc.orientation);
                const faceZ: number = Position.moveZ(npc.z, npc.orientation);
                out.p2(faceX * 2 + 1);
                out.p2(faceZ * 2 + 1);
            } else {
                out.p2(npc.faceX);
                out.p2(npc.faceZ);
            }
        }
    }

    private calculateUpdateSize(npc: Npc, newlyObserved: boolean): number {
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
            length += (npc.chat?.length ?? 0) + 1;
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