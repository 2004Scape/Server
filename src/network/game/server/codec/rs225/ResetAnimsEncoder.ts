import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import ResetAnims from '#/network/game/server/model/ResetAnims.js';

export default class ResetAnimsEncoder extends MessageEncoder<ResetAnims> {
    prot = ServerProt.RESET_ANIMS;

    encode(_: Packet, __: ResetAnims): void {}
}
