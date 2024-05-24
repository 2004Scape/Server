import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpLocT from '#lostcity/network/225/incoming/OpLocT.js';

export default class OpLocTDecoder extends MessageDecoder<OpLocT> {
    prot = ClientProt.OPLOCT;

    decode(buf: Packet) {
        const x = buf.g2();
        const z = buf.g2();
        const loc = buf.g2();
        const spellComponent = buf.g2();
        return new OpLocT(x, z, loc, spellComponent);
    }
}
