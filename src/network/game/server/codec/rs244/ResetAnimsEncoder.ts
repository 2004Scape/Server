import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import ResetAnims from '#/network/game/server/model/ResetAnims.js';

export default class ResetAnimsEncoder extends MessageEncoder<ResetAnims> {
    prot = ServerProt244.RESET_ANIMS;

    encode(_: Packet, __: ResetAnims): void {}
}
