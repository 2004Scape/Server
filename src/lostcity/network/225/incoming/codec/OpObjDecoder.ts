import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpObj from '#lostcity/network/225/incoming/OpObj.js';

export default class OpObjDecoder extends MessageDecoder<OpObj> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet) {
        const x = buf.g2();
        const z = buf.g2();
        const obj = buf.g2();
        return new OpObj(this.op, x, z, obj);
    }
}
