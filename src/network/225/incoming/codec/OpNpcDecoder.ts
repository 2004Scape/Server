import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import OpNpc from '#/network/incoming/model/OpNpc.js';

export default class OpNpcDecoder extends MessageDecoder<OpNpc> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet) {
        const nid = buf.g2();
        return new OpNpc(this.op, nid);
    }
}
