import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import DataLand from '#/network/game/server/model/DataLand.js';

export default class DataLandEncoder extends MessageEncoder<DataLand> {
    prot = ServerProt225.DATA_LAND;

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
