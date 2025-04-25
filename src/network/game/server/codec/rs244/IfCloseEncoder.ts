import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import IfClose from '#/network/game/server/model/IfClose.js';

export default class IfCloseEncoder extends MessageEncoder<IfClose> {
    prot = ServerProt.IF_CLOSE;

    encode(_: Packet, __: IfClose): void {}
}
