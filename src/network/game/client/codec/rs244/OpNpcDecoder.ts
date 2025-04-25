import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import OpNpc from '#/network/game/client/model/OpNpc.js';


export default class OpNpcDecoder extends MessageDecoder<OpNpc> {
    constructor(
        readonly prot: ClientProt244,
        readonly op: number
    ) {
        super();
    }

    decode(buf: Packet) {
        const nid = buf.g2();
        return new OpNpc(this.op, nid);
    }
}
