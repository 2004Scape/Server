import Player from '#lostcity/entity/Player.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoAppearance from '#lostcity/network/outgoing/model/PlayerInfoAppearance.js';
import PlayerInfoAnim from '#lostcity/network/outgoing/model/PlayerInfoAnim.js';
import PlayerInfoFaceEntity from '#lostcity/network/outgoing/model/PlayerInfoFaceEntity.js';
import PlayerInfoSay from '#lostcity/network/outgoing/model/PlayerInfoSay.js';
import PlayerInfoFaceCoord from '#lostcity/network/outgoing/model/PlayerInfoFaceCoord.js';
import PlayerInfoChat from '#lostcity/network/outgoing/model/PlayerInfoChat.js';
import PlayerInfoSpotanim from '#lostcity/network/outgoing/model/PlayerInfoSpotanim.js';
import Renderer from '#lostcity/engine/renderer/Renderer.js';
import PlayerInfoDamage from '#lostcity/network/outgoing/model/PlayerInfoDamage.js';
import PlayerStat from '#lostcity/entity/PlayerStat.js';
import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';
import Packet from '#jagex2/io/Packet.js';
import PlayerInfoExactMove from '#lostcity/network/outgoing/model/PlayerInfoExactMove.js';
import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import ServerProtRepository from '#lostcity/network/225/outgoing/prot/ServerProtRepository.js';

export default class PlayerRenderer extends Renderer<Player>  {
    private readonly appearances: Map<number, Uint8Array>;
    private readonly chats: Map<number, Uint8Array>;

    constructor() {
        super();
        this.appearances = new Map();
        this.chats = new Map();
    }

    computeInfo(player: Player): void {
        const masks: number = player.masks;
        const pid: number = player.pid;

        if (pid === -1 || masks === 0) {
            return;
        }

        let lows: number = 0;
        let highs: number = 0;

        // ---- 0
        if (masks & InfoProt.PLAYER_APPEARANCE.id && player.appearance) {
            highs += lows += this.cacheAppearance(pid, new PlayerInfoAppearance(player.appearance));
        }

        // ---- 1
        if (masks & InfoProt.PLAYER_ANIM.id) {
            highs += this.cacheAnim(pid, new PlayerInfoAnim(player.animId, player.animDelay));
        }

        // ---- 2
        if (masks & InfoProt.PLAYER_FACE_ENTITY.id) {
            // todo: get rid of alreadyFacedEntity (this is bad but idc)
            const entity: number = player.faceEntity;
            if (entity !== -1) {
                player.alreadyFacedEntity = true;
            }

            highs += lows += this.cacheEntity(pid, new PlayerInfoFaceEntity(entity));
        }

        // ---- 3
        if (masks & InfoProt.PLAYER_SAY.id && player.chat) {
            highs += this.cacheSay(pid, new PlayerInfoSay(player.chat));
        }

        // ---- 4
        if (masks & InfoProt.PLAYER_DAMAGE.id) {
            highs += this.cacheDamage(pid, new PlayerInfoDamage(player.damageTaken, player.damageType, player.levels[PlayerStat.HITPOINTS], player.baseLevels[PlayerStat.HITPOINTS]));
        }

        // ---- 5
        if (masks & InfoProt.PLAYER_FACE_COORD.id) {
            highs += lows += this.cacheCoord(pid, new PlayerInfoFaceCoord(player.faceX, player.faceZ));
        }

        // ---- 6
        if (masks & InfoProt.PLAYER_CHAT.id && player.messageColor !== null && player.messageEffect !== null && player.messageType !== null && player.message) {
            highs += this.cacheChat(pid, new PlayerInfoChat(player.messageColor, player.messageEffect, player.messageType, player.message));
        }

        // ---- 7
        if (masks & InfoProt.PLAYER_SPOTANIM.id) {
            highs += this.cacheSpotanim(pid, new PlayerInfoSpotanim(player.graphicId, player.graphicHeight, player.graphicDelay));
        }

        // ---- 8
        if (masks & InfoProt.PLAYER_EXACT_MOVE.id) {
            highs += InfoProt.PLAYER_EXACT_MOVE.length;
        }

        if (highs > 0) {
            this.highs.set(pid, highs + this.header(masks));
        }

        if (lows > 0) {
            this.lows.set(pid, this.header(InfoProt.PLAYER_APPEARANCE.id + InfoProt.PLAYER_FACE_ENTITY.id + InfoProt.PLAYER_FACE_COORD.id) + InfoProt.PLAYER_FACE_ENTITY.length + InfoProt.PLAYER_FACE_COORD.length + (this.appearances.get(pid)?.length ?? 0));
        }
    }

    cacheAppearance(id: number, message: InfoMessage): number {
        if (this.appearances.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.appearances, id, message);
    }

    writeAppearance(buf: Packet, id: number): void {
        this.writeBlock(buf, this.appearances, id);
    }

    cacheChat(id: number, message: InfoMessage): number {
        if (this.chats.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.chats, id, message);
    }

    writeChat(buf: Packet, id: number): void {
        this.writeBlock(buf, this.chats, id);
    }

    writeExactmove(buf: Packet, startX: number, startZ: number, endX: number, endZ: number, start: number, end: number, direction: number): void {
        const message: InfoMessage = new PlayerInfoExactMove(startX, startZ, endX, endZ, start, end, direction);
        const encoder: InfoMessageEncoder<InfoMessage> | undefined = ServerProtRepository.getInfoEncoder(message);
        if (typeof encoder === 'undefined') {
            throw new Error(`Encoder not found for info message! ${message}`);
        }
        encoder.encode(buf, message);
    }

    removeTemporary() {
        super.removeTemporary();
        this.chats.clear();
    }

    removePermanent(pid: number) {
        super.removePermanent(pid);
        this.appearances.delete(pid);
        this.chats.delete(pid);
    }
}