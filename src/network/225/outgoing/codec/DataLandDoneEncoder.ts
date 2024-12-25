import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import DataLandDone from '#/network/outgoing/model/DataLandDone.js';

export default class DataLandDoneEncoder extends MessageEncoder<DataLandDone> {
    prot = ServerProt.DATA_LAND_DONE;

    encode(buf: Packet, message: DataLandDone): void {
        buf.p1(message.x);
        buf.p1(message.z);
    }
}