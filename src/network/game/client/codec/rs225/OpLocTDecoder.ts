import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs225/ClientProt.js';
import OpLocT from '#/network/game/client/model/OpLocT.js';

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
