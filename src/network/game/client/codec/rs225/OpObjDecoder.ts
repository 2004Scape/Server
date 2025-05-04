import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import OpObj from '#/network/game/client/model/OpObj.js';

export default class OpObjDecoder extends MessageDecoder<OpObj> {
    constructor(
        readonly prot: ClientProt225,
        readonly op: number
    ) {
        super();
    }

    decode(buf: Packet) {
        const x = buf.g2();
        const z = buf.g2();
        const obj = buf.g2();
        return new OpObj(this.op, x, z, obj);
    }
}
