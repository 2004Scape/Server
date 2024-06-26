import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import LocDel from '#lostcity/network/outgoing/model/LocDel.js';

export default class LocDelEncoder extends MessageEncoder<LocDel> {
    prot = ServerProt.LOC_DEL;

    encode(buf: Packet, message: LocDel): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
    }
}