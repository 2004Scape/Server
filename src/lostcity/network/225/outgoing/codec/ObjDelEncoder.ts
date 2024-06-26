import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import ObjDel from '#lostcity/network/outgoing/model/ObjDel.js';

export default class ObjDelEncoder extends MessageEncoder<ObjDel> {
    prot = ServerProt.OBJ_DEL;

    encode(buf: Packet, message: ObjDel): void {
        buf.p1(message.coord);
        buf.p2(message.obj);
    }
}