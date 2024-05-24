import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpNpc from '#lostcity/network/225/incoming/OpNpc.js';

export default class OpNpcDecoder extends MessageDecoder<OpNpc> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet) {
        const nid = buf.g2();
        return new OpNpc(this.op, nid);
    }
}
