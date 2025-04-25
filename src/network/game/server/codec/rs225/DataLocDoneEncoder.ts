import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import DataLocDone from '#/network/game/server/model/DataLocDone.js';

export default class DataLocDoneEncoder extends MessageEncoder<DataLocDone> {
    prot = ServerProt.DATA_LOC_DONE;

    encode(buf: Packet, message: DataLocDone): void {
        buf.p1(message.x);
        buf.p1(message.z);
    }
}
