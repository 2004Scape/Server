import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import ObjAdd from '#lostcity/network/outgoing/model/ObjAdd.js';

export default class ObjAddEncoder extends MessageEncoder<ObjAdd> {
    prot = ServerProt.OBJ_ADD;

    encode(buf: Packet, message: ObjAdd): void {
        buf.p1(message.coord);
        buf.p2(message.obj);
        buf.p2(Math.min(message.count, 65535));
    }
}