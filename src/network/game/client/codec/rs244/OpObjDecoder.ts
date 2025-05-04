import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import OpObj from '#/network/game/client/model/OpObj.js';


export default class OpObjDecoder extends MessageDecoder<OpObj> {
    constructor(
        readonly prot: ClientProt244,
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
