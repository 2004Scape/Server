import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfSetObject from '#/network/game/server/model/IfSetObject.js';

export default class IfSetObjectEncoder extends MessageEncoder<IfSetObject> {
    prot = ServerProt225.IF_SETOBJECT;

    encode(buf: Packet, message: IfSetObject): void {
        buf.p2(message.component);
        buf.p2(message.obj);
        buf.p2(message.scale);
    }
}
