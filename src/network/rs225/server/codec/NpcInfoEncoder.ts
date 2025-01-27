import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import NpcInfo from '#/network/server/model/NpcInfo.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import Npc from '#/engine/entity/Npc.js';
import BuildArea from '#/engine/entity/BuildArea.js';
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
        const buildArea: BuildArea = message.player.buildArea;

        if (message.changedLevel || message.deltaX > buildArea.viewDistance || message.deltaZ > buildArea.viewDistance) {
            // optimization to avoid sending 3 bits * observed npcs when everything has to be removed anyways
            buildArea.npcs.clear();
        }

        const updates: Packet = Packet.alloc(1);
        buf.bits();
        const bytes: number = this.writeNpcs(buf, updates, message, 0);
        this.writeNewNpcs(buf, updates, message, bytes);
        if (updates.pos > 0) {
            buf.pBit(13, 8191);
            buf.bytes();
            buf.pdata(updates.data, 0, updates.pos);
        } else {
            buf.bytes();
        }
        updates.release();
    }

    test(_: NpcInfo): number {
        return NpcInfoEncoder.BYTES_LIMIT;
    }

    private writeNpcs(buf: Packet, updates: Packet, message: NpcInfo, bytes: number): number {
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
                this.run(buf, updates, renderer, npc, walkDir, runDir, extend && this.willFit(bytes, buf, NpcInfoEncoder.BITS_RUN, length));
            } else if (walkDir !== -1) {
                this.walk(buf, updates, renderer, npc, walkDir, extend && this.willFit(bytes, buf, NpcInfoEncoder.BITS_WALK, length));
            } else if (extend && this.willFit(bytes, buf, NpcInfoEncoder.BITS_EXTENDED, length)) {
                this.extend(buf, updates, renderer, npc);
            } else {
                this.idle(buf);
            }
            bytes += length;
        }
        return bytes;
    }

    private writeNewNpcs(buf: Packet, updates: Packet, message: NpcInfo, bytes: number): void {
        const { renderer, player } = message;
        const { buildArea, level, x, z, originX, originZ } = player;
        for (const npc of buildArea.getNearbyNpcs(level, x, z, originX, originZ)) {
            const nid: number = npc.nid;
            const length: number = renderer.lowdefinitions(nid) + renderer.highdefinitions(nid);
            // bits to add npc + extended info size + bits to break loop (13)
            if (!this.willFit(bytes, buf, NpcInfoEncoder.BITS_NEW + 13, length)) {
                // more npcs get added next tick
                break;
            }
            this.add(buf, updates, renderer, player, npc, nid, npc.x - x, npc.z - z, npc.type);
            bytes += length;
        }
    }

    private add(buf: Packet, updates: Packet, renderer: NpcRenderer, player: Player, npc: Npc, nid: number, x: number, z: number, type: number): void {
        buf.pBit(13, nid);
        buf.pBit(11, type);
        buf.pBit(5, x);
        buf.pBit(5, z);
        buf.pBit(1, 1); // extend
        this.lowdefinition(updates, renderer, npc);
        player.buildArea.npcs.add(npc);
    }

    private remove(buf: Packet, buildArea: BuildArea, npc: Npc): void {
        buf.pBit(1, 1);
        buf.pBit(2, 3);
        buildArea.npcs.delete(npc);
    }

    private run(buf: Packet, updates: Packet, renderer: NpcRenderer, npc: Npc, walkDir: number, runDir: number, extend: boolean): void {
        buf.pBit(1, 1);
        buf.pBit(2, 2);
        buf.pBit(3, walkDir);
        buf.pBit(3, runDir);
        if (extend) {
            buf.pBit(1, 1);
            this.highdefinition(updates, renderer, npc);
        } else {
            buf.pBit(1, 0);
        }
    }

    private walk(buf: Packet, updates: Packet, renderer: NpcRenderer, npc: Npc, walkDir: number, extend: boolean): void {
        buf.pBit(1, 1);
        buf.pBit(2, 1);
        buf.pBit(3, walkDir);
        if (extend) {
            buf.pBit(1, 1);
            this.highdefinition(updates, renderer, npc);
        } else {
            buf.pBit(1, 0);
        }
    }

    private extend(buf: Packet, updates: Packet, renderer: NpcRenderer, npc: Npc): void {
        buf.pBit(1, 1);
        buf.pBit(2, 0);
        this.highdefinition(updates, renderer, npc);
    }

    private idle(buf: Packet): void {
        buf.pBit(1, 0);
    }

    private highdefinition(updates: Packet, renderer: NpcRenderer, other: Npc): void {
        this.writeBlocks(updates, renderer, other.nid, other.masks);
    }

    private lowdefinition(updates: Packet, renderer: NpcRenderer, other: Npc): void {
        const nid: number = other.nid;
        let masks: number = other.masks;

        if (other.faceEntity !== -1 && !renderer.has(nid, InfoProt.NPC_FACE_ENTITY)) {
            renderer.cache(nid, new NpcInfoFaceEntity(other.faceEntity), InfoProt.NPC_FACE_ENTITY);
            masks |= InfoProt.NPC_FACE_ENTITY.id;
        }

        if (!renderer.has(nid, InfoProt.NPC_FACE_COORD)) {
            if (other.faceX !== -1) {
                renderer.cache(nid, new NpcInfoFaceCoord(other.faceX, other.faceZ), InfoProt.NPC_FACE_COORD);
            } else if (other.orientationX !== -1) {
                renderer.cache(nid, new NpcInfoFaceCoord(other.orientationX, other.orientationZ), InfoProt.NPC_FACE_COORD);
            } else {
                // this is a fail safe but should not happen.
                renderer.cache(nid, new NpcInfoFaceCoord(CoordGrid.fine(other.x, 1), CoordGrid.fine(other.z - 1, 1)), InfoProt.NPC_FACE_COORD);
            }
        }

        masks |= InfoProt.NPC_FACE_COORD.id;

        this.writeBlocks(updates, renderer, nid, masks);
    }

    private writeBlocks(updates: Packet, renderer: NpcRenderer, nid: number, masks: number): void {
        renderer.write1(updates, masks);
        if (masks & InfoProt.NPC_ANIM.id) {
            renderer.write(updates, nid, InfoProt.NPC_ANIM);
        }
        if (masks & InfoProt.NPC_FACE_ENTITY.id) {
            renderer.write(updates, nid, InfoProt.NPC_FACE_ENTITY);
        }
        if (masks & InfoProt.NPC_SAY.id) {
            renderer.write(updates, nid, InfoProt.NPC_SAY);
        }
        if (masks & InfoProt.NPC_DAMAGE.id) {
            renderer.write(updates, nid, InfoProt.NPC_DAMAGE);
        }
        if (masks & InfoProt.NPC_CHANGE_TYPE.id) {
            renderer.write(updates, nid, InfoProt.NPC_CHANGE_TYPE);
        }
        if (masks & InfoProt.NPC_SPOTANIM.id) {
            renderer.write(updates, nid, InfoProt.NPC_SPOTANIM);
        }
        if (masks & InfoProt.NPC_FACE_COORD.id) {
            renderer.write(updates, nid, InfoProt.NPC_FACE_COORD);
        }
    }

    private willFit(bytes: number, buf: Packet, bitsToAdd: number, bytesToAdd: number): boolean {
        // 7 aligns to the next byte
        return ((buf.bitPos + bitsToAdd + 7) >>> 3) + (bytes + bytesToAdd) <= NpcInfoEncoder.BYTES_LIMIT;
    }
}