import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import DataLand from '#/network/outgoing/model/DataLand.js';

export default class DataLandEncoder extends MessageEncoder<DataLand> {
    prot = ServerProt.DATA_LAND;

    encode(buf: Packet, message: DataLand): void {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.offset);
        buf.p2(message.length);
        buf.pdata(message.data, 0, message.data.length);
    }

    test(message: DataLand): number {
        return 1 + 1 + 2 + 2 + message.data.length;
    }
}