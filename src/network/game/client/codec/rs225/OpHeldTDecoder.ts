import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import OpHeldT from '#/network/game/client/model/OpHeldT.js';

export default class OpHeldTDecoder extends MessageDecoder<OpHeldT> {
    prot = ClientProt225.OPHELDT;

    decode(buf: Packet) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        const spellComponent = buf.g2();
        return new OpHeldT(obj, slot, component, spellComponent);
    }
}
