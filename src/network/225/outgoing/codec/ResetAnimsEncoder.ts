import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import ResetAnims from '#/network/outgoing/model/ResetAnims.js';

export default class ResetAnimsEncoder extends MessageEncoder<ResetAnims> {
    prot = ServerProt.RESET_ANIMS;

    encode(_: Packet, __: ResetAnims): void {}
}