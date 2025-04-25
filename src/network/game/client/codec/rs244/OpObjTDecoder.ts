import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs244/ClientProt.js';
import OpObjT from '#/network/game/client/model/OpObjT.js';


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
