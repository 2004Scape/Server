import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import OpNpc from '#/network/game/client/model/OpNpc.js';

export default class OpNpcDecoder extends MessageDecoder<OpNpc> {
    constructor(
        readonly prot: ClientProt225,
        readonly op: number
    ) {
        super();
    }

    decode(buf: Packet) {
        const nid = buf.g2();
        return new OpNpc(this.op, nid);
    }
}
