import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpNpcT from '#lostcity/network/225/incoming/OpNpcT.js';

export default class OpNpcTDecoder extends MessageDecoder<OpNpcT> {
    prot = ClientProt.OPNPCT;

    decode(buf: Packet) {
        const nid = buf.g2();
        const spellComponent = buf.g2();
        return new OpNpcT(nid, spellComponent);
    }
}
