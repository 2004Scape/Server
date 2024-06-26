import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import LocMerge from '#lostcity/network/outgoing/model/LocMerge.js';

export default class LocMergeEncoder extends MessageEncoder<LocMerge> {
    prot = ServerProt.LOC_MERGE;

    encode(buf: Packet, message: LocMerge): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
        buf.p2(message.locId);
        buf.p2(message.startCycle);
        buf.p2(message.endCycle);
        buf.p2(message.pid);
        buf.p1(message.east - message.srcX);
        buf.p1(message.south - message.srcZ);
        buf.p1(message.west - message.srcX);
        buf.p1(message.north - message.srcZ);
    }
}