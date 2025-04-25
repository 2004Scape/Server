import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import IfSetPlayerHead from '#/network/game/server/model/IfSetPlayerHead.js';

export default class IfSetPlayerHeadEncoder extends MessageEncoder<IfSetPlayerHead> {
    prot = ServerProt244.IF_SETPLAYERHEAD;

    encode(buf: Packet, message: IfSetPlayerHead): void {
        buf.p2(message.component);
    }
}
