import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import NpcInfo from '#/network/server/model/NpcInfo.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import Npc from '#/engine/entity/Npc.js';
import BuildArea from '#/engine/entity/BuildArea.js';
import Renderer from '#/engine/renderer/Renderer.js';
import Player from '#/engine/entity/Player.js';
import NpcInfoFaceEntity from '#/network/server/model/NpcInfoFaceEntity.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoFaceCoord from '#/network/server/model/NpcInfoFaceCoord.js';
import NpcRenderer from '#/engine/renderer/NpcRenderer.js';

export default class NpcInfoEncoder extends MessageEncoder<NpcInfo> {
    private static readonly BITS_NEW: number = 13 + 11 + 5 + 5 + 1;
    private static readonly BITS_RUN: number = 1 + 2 + 3 + 3 + 1;
    private static readonly BITS_WALK: number = 1 + 2 + 3 + 1;
    private static readonly BITS_EXTENDED: number = 1 + 2;
    private static readonly BYTES_LIMIT: number = 4997;

    prot = ServerProt.NPC_INFO;

    encode(buf: Packet, message: NpcInfo): void {
        const player = message.player;
        const buildArea: BuildArea = player.buildArea;

        if (message.changedLevel || message.deltaX > buildArea.viewDistance || message.deltaZ > buildArea.viewDistance) {
            // optimization to avoid sending 3 bits * observed npcs when everything has to be removed anyways
            buildArea.npcs.clear();
        }

        buf.bits();
        let bytes: number = 0;
        bytes = this.writeNpcs(buf, message, bytes);
        this.writeNewNpcs(buf, message, bytes);
        if (buildArea.highNpcs.size > 0 || buildArea.lowNpcs.size > 0) {
            buf.pBit(13, 8191);
        }
        buf.bytes();

        const renderer: NpcRenderer = message.renderer;
        for (const high of buildArea.highNpcs) {
            this.highdefinition(buf, renderer, player, high, false);
        }
        for (const low of buildArea.lowNpcs) {
            this.lowdefinition(buf, renderer, player, low);
        }
        buildArea.clearNpcInfo();
    }

    test(_: NpcInfo): number {
        return NpcInfoEncoder.BYTES_LIMIT;
    }

    private writeNpcs(buf: Packet, message: NpcInfo, bytes: number): number {
        const {currentTick, renderer, player } = message;
        const buildArea: BuildArea = player.buildArea;
        // update existing npcs (255 max - 8 bits)
        buf.pBit(8, buildArea.npcs.size);
        for (const npc of buildArea.npcs) {
            const nid: number = npc.nid;
            if (nid === -1 || npc.tele || npc.level !== player.level || !CoordGrid.isWithinDistanceSW(player, npc, 15) || !npc.checkLifeCycle(currentTick)) {
                // if the npc was teleported, it needs to be removed and re-added
                this.remove(buf, buildArea, npc);
                continue;
            }
            const length: number = renderer.highdefinitions(nid);
            const extend: boolean = length > 0;
            const { walkDir, runDir } = npc;
            if (runDir !== -1) {
                this.run(buf, buildArea, npc, walkDir, runDir, extend && this.willFit(bytes, buf, NpcInfoEncoder.BITS_RUN, length));
            } else if (walkDir !== -1) {
                this.walk(buf, buildArea, npc, walkDir, extend && this.willFit(bytes, buf, NpcInfoEncoder.BITS_WALK, length));
            } else if (extend && this.willFit(bytes, buf, NpcInfoEncoder.BITS_EXTENDED, length)) {
                this.extend(buf, buildArea, npc);
            } else {
                this.idle(buf);
            }
            bytes += length;
        }
        return bytes;
    }

    private writeNewNpcs(buf: Packet, message: NpcInfo, bytes: number): void {
        const renderer: Renderer<Npc> = message.renderer;
        const {buildArea, level, x, z, originX, originZ} = message.player;
        for (const npc of buildArea.getNearbyNpcs(level, x, z, originX, originZ)) {
            const nid: number = npc.nid;
            const length: number = renderer.lowdefinitions(nid) + renderer.highdefinitions(nid);
            // bits to add npc + extended info size + bits to break loop (13)
            if (!this.willFit(bytes, buf, NpcInfoEncoder.BITS_NEW + 13, length)) {
                // more npcs get added next tick
                break;
            }
            this.add(buf, buildArea, npc, nid, npc.x - x, npc.z - z, npc.type);
            bytes += length;
        }
    }

    private add(buf: Packet, buildArea: BuildArea, npc: Npc, nid: number, x: number, z: number, type: number): void {
        buf.pBit(13, nid);
        buf.pBit(11, type);
        buf.pBit(5, x);
        buf.pBit(5, z);
        buf.pBit(1, 1); // extend
        buildArea.lowNpcs.add(npc);
        buildArea.npcs.add(npc);
    }

    private remove(buf: Packet, buildArea: BuildArea, npc: Npc): void {
        buf.pBit(1, 1);
        buf.pBit(2, 3);
        buildArea.npcs.delete(npc);
    }

    private run(buf: Packet, buildArea: BuildArea, npc: Npc, walkDir: number, runDir: number, extend: boolean): void {
        buf.pBit(1, 1);
        buf.pBit(2, 2);
        buf.pBit(3, walkDir);
        buf.pBit(3, runDir);
        if (extend) {
            buf.pBit(1, 1);
            buildArea.highNpcs.add(npc);
        } else {
            buf.pBit(1, 0);
        }
    }

    private walk(buf: Packet, buildArea: BuildArea, npc: Npc, walkDir: number, extend: boolean): void {
        buf.pBit(1, 1);
        buf.pBit(2, 1);
        buf.pBit(3, walkDir);
        if (extend) {
            buf.pBit(1, 1);
            buildArea.highNpcs.add(npc);
        } else {
            buf.pBit(1, 0);
        }
    }

    private extend(buf: Packet, buildArea: BuildArea, npc: Npc): void {
        buf.pBit(1, 1);
        buf.pBit(2, 0);
        buildArea.highNpcs.add(npc);
    }

    private idle(buf: Packet): void {
        buf.pBit(1, 0);
    }

    private highdefinition(buf: Packet, renderer: NpcRenderer, _: Player, other: Npc, __: boolean): void {
        this.writeBlocks(buf, renderer, other.nid, other.masks);
    }

    private lowdefinition(buf: Packet, renderer: NpcRenderer, _: Player, other: Npc): void {
        const nid: number = other.nid;
        let masks: number = other.masks;

        if (other.faceEntity !== -1 && !renderer.has(nid, InfoProt.NPC_FACE_ENTITY)) {
            renderer.cache(nid, new NpcInfoFaceEntity(other.faceEntity), InfoProt.NPC_FACE_ENTITY);
            masks |= InfoProt.NPC_FACE_ENTITY.id;
        }

        if (!renderer.has(nid, InfoProt.NPC_FACE_COORD)) {
            if (other.orientationX !== -1) {
                renderer.cache(nid, new NpcInfoFaceCoord(other.orientationX, other.orientationZ), InfoProt.NPC_FACE_COORD);
            } else if (other.faceX !== -1) {
                renderer.cache(nid, new NpcInfoFaceCoord(other.faceX, other.faceZ), InfoProt.NPC_FACE_COORD);
            } else {
                renderer.cache(nid, new NpcInfoFaceCoord(other.x * 2 + 1, (other.z - 1) * 2 + 1), InfoProt.NPC_FACE_COORD);
            }
        }

        masks |= InfoProt.NPC_FACE_COORD.id;

        this.writeBlocks(buf, renderer, nid, masks);
    }

    private writeBlocks(buf: Packet, renderer: NpcRenderer, nid: number, masks: number): void {
        renderer.write1(buf, masks);
        if (masks & InfoProt.NPC_ANIM.id) {
            renderer.write(buf, nid, InfoProt.NPC_ANIM);
        }
        if (masks & InfoProt.NPC_FACE_ENTITY.id) {
            renderer.write(buf, nid, InfoProt.NPC_FACE_ENTITY);
        }
        if (masks & InfoProt.NPC_SAY.id) {
            renderer.write(buf, nid, InfoProt.NPC_SAY);
        }
        if (masks & InfoProt.NPC_DAMAGE.id) {
            renderer.write(buf, nid, InfoProt.NPC_DAMAGE);
        }
        if (masks & InfoProt.NPC_CHANGE_TYPE.id) {
            renderer.write(buf, nid, InfoProt.NPC_CHANGE_TYPE);
        }
        if (masks & InfoProt.NPC_SPOTANIM.id) {
            renderer.write(buf, nid, InfoProt.NPC_SPOTANIM);
        }
        if (masks & InfoProt.NPC_FACE_COORD.id) {
            renderer.write(buf, nid, InfoProt.NPC_FACE_COORD);
        }
    }

    private willFit(bytes: number, buf: Packet, bitsToAdd: number, bytesToAdd: number): boolean {
        // 7 aligns to the next byte
        return ((buf.bitPos + bitsToAdd + 7) >>> 3) + (bytes + bytesToAdd) <= NpcInfoEncoder.BYTES_LIMIT;
    }
}