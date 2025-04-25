import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import DataLandDone from '#/network/game/server/model/DataLandDone.js';

export default class DataLandDoneEncoder extends MessageEncoder<DataLandDone> {
    prot = ServerProt225.DATA_LAND_DONE;

    encode(buf: Packet, message: DataLandDone): void {
        buf.p1(message.x);
        buf.p1(message.z);
    }
}
