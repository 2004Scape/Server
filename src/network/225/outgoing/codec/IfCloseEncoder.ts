import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfClose from '#/network/outgoing/model/IfClose.js';

export default class IfCloseEncoder extends MessageEncoder<IfClose> {
    prot = ServerProt.IF_CLOSE;

    encode(_: Packet, __: IfClose): void {}
}