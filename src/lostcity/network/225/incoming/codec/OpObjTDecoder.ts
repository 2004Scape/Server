import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpObjT from '#lostcity/network/225/incoming/OpObjT.js';

export default class OpObjTDecoder extends MessageDecoder<OpObjT> {
    prot = ClientProt.OPOBJT;

    decode(buf: Packet) {
        const x = buf.g2();
        const z = buf.g2();
        const obj = buf.g2();
        const spellComponent = buf.g2();
        return new OpObjT(x, z, obj, spellComponent);
    }
}
