import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import ObjCount from '#lostcity/network/outgoing/model/ObjCount.js';

export default class ObjCountEncoder extends MessageEncoder<ObjCount> {
    prot = ServerProt.OBJ_COUNT;

    encode(buf: Packet, message: ObjCount): void {
        buf.p1(message.coord);
        buf.p2(message.obj);
        buf.p2(Math.min(message.oldCount, 65535));
        buf.p2(Math.min(message.newCount, 65535));
    }
}