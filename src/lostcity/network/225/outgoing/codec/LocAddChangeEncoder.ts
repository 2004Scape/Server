import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import LocAddChange from '#lostcity/network/outgoing/model/LocAddChange.js';

export default class LocAddChangeEncoder extends MessageEncoder<LocAddChange> {
    prot = ServerProt.LOC_ADD_CHANGE;

    encode(buf: Packet, message: LocAddChange): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
        buf.p2(message.loc);
    }
}