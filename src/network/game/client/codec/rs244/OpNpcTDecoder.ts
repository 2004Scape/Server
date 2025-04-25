import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs244/ClientProt.js';
import OpNpcT from '#/network/game/client/model/OpNpcT.js';


export default class OpNpcTDecoder extends MessageDecoder<OpNpcT> {
    prot = ClientProt.OPNPCT;

    decode(buf: Packet) {
        const nid = buf.g2();
        const spellComponent = buf.g2();
        return new OpNpcT(nid, spellComponent);
    }
}
