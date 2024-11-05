import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import Renderer from '#lostcity/engine/renderer/Renderer.js';
import PlayerStat from '#lostcity/entity/PlayerStat.js';
import Npc from '#lostcity/entity/Npc.js';
import NpcInfoAnim from '#lostcity/network/outgoing/model/NpcInfoAnim.js';
import NpcInfoFaceEntity from '#lostcity/network/outgoing/model/NpcInfoFaceEntity.js';
import NpcInfoSay from '#lostcity/network/outgoing/model/NpcInfoSay.js';
import NpcInfoDamage from '#lostcity/network/outgoing/model/NpcInfoDamage.js';
import NpcInfoChangeType from '#lostcity/network/outgoing/model/NpcInfoChangeType.js';
import NpcInfoSpotanim from '#lostcity/network/outgoing/model/NpcInfoSpotanim.js';
import NpcInfoFaceCoord from '#lostcity/network/outgoing/model/NpcInfoFaceCoord.js';
import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';
import Packet from '#jagex2/io/Packet.js';

export default class NpcRenderer extends Renderer<Npc> {
    private readonly changes: Map<number, Uint8Array>;

    constructor() {
        super();
        this.changes = new Map();
    }

    computeInfo(npc: Npc): void {
        const masks: number = npc.masks;
        const nid: number = npc.nid;

        if (nid === -1 || masks === 0) {
            return;
        }

        let lows: number = 0;
        let highs: number = 0;

        // ---- 0
        if (masks & InfoProt.NPC_ANIM.id) {
            highs += this.cacheAnim(nid, new NpcInfoAnim(npc.animId, npc.animDelay));
        }

        // ---- 1
        if (masks & InfoProt.NPC_FACE_ENTITY.id) {
            // todo: get rid of alreadyFacedEntity (this is bad but idc)
            const entity: number = npc.faceEntity;
            if (entity !== -1) {
                npc.alreadyFacedEntity = true;
            }

            highs += lows += this.cacheEntity(nid, new NpcInfoFaceEntity(entity));
        }

        // ---- 2
        if (masks & InfoProt.NPC_SAY.id && npc.chat) {
            highs += this.cacheSay(nid, new NpcInfoSay(npc.chat));
        }

        // ---- 3
        if (masks & InfoProt.NPC_DAMAGE.id) {
            highs += this.cacheDamage(nid, new NpcInfoDamage(npc.damageTaken, npc.damageType, npc.levels[PlayerStat.HITPOINTS], npc.baseLevels[PlayerStat.HITPOINTS]));
        }

        // ---- 4
        if (masks & InfoProt.NPC_CHANGE_TYPE.id) {
            highs += this.cacheChange(nid, new NpcInfoChangeType(npc.type));
        }

        // ---- 5
        if (masks & InfoProt.NPC_SPOTANIM.id) {
            highs += this.cacheSpotanim(nid, new NpcInfoSpotanim(npc.graphicId, npc.graphicHeight, npc.graphicDelay));
        }

        // ---- 6
        if (masks & InfoProt.NPC_FACE_COORD.id) {
            highs += lows += this.cacheCoord(nid, new NpcInfoFaceCoord(npc.faceX, npc.faceZ));
        }

        if (highs > 0) {
            this.highs.set(nid, highs + this.header(masks));
        }

        if (lows > 0) {
            this.lows.set(nid, this.header(InfoProt.NPC_FACE_ENTITY.id + InfoProt.NPC_FACE_COORD.id) + InfoProt.NPC_FACE_ENTITY.length + InfoProt.NPC_FACE_COORD.length);
        }
    }

    cacheChange(id: number, message: InfoMessage): number {
        if (this.changes.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.changes, id, message);
    }

    writeChange(buf: Packet, id: number): void {
        this.writeBlock(buf, this.changes, id);
    }

    removeTemporary() {
        super.removeTemporary();
        this.changes.clear();
    }

    removePermanent(uid: number) {
        super.removePermanent(uid);
        this.changes.delete(uid);
    }
}