import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import ResetAnims from '#/network/server/model/ResetAnims.js';

export default class ResetAnimsEncoder extends MessageEncoder<ResetAnims> {
    prot = ServerProt.RESET_ANIMS;

    encode(_: Packet, __: ResetAnims): void {}
}