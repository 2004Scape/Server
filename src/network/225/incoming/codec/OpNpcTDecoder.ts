import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import OpNpcT from '#/network/incoming/model/OpNpcT.js';

export default class OpNpcTDecoder extends MessageDecoder<OpNpcT> {
    prot = ClientProt.OPNPCT;

    decode(buf: Packet) {
        const nid = buf.g2();
        const spellComponent = buf.g2();
        return new OpNpcT(nid, spellComponent);
    }
}
