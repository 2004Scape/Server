import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import DataLocDone from '#/network/outgoing/model/DataLocDone.js';

export default class DataLocDoneEncoder extends MessageEncoder<DataLocDone> {
    prot = ServerProt.DATA_LOC_DONE;

    encode(buf: Packet, message: DataLocDone): void {
        buf.p1(message.x);
        buf.p1(message.z);
    }
}