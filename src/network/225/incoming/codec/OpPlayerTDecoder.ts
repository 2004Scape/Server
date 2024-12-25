import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import OpPlayerT from '#/network/incoming/model/OpPlayerT.js';

export default class OpPlayerTDecoder extends MessageDecoder<OpPlayerT> {
    prot = ClientProt.OPPLAYERT;

    decode(buf: Packet) {
        const pid = buf.g2();
        const spellComponent = buf.g2();
        return new OpPlayerT(pid, spellComponent);
    }
}
