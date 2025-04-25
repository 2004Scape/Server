import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import OpPlayerT from '#/network/game/client/model/OpPlayerT.js';


export default class OpPlayerTDecoder extends MessageDecoder<OpPlayerT> {
    prot = ClientProt244.OPPLAYERT;

    decode(buf: Packet) {
        const pid = buf.g2();
        const spellComponent = buf.g2();
        return new OpPlayerT(pid, spellComponent);
    }
}
