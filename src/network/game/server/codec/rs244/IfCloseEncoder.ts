import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import IfClose from '#/network/game/server/model/IfClose.js';

export default class IfCloseEncoder extends MessageEncoder<IfClose> {
    prot = ServerProt244.IF_CLOSE;

    encode(_: Packet, __: IfClose): void {}
}
