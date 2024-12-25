import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import OpHeldT from '#/network/incoming/model/OpHeldT.js';

export default class OpHeldTDecoder extends MessageDecoder<OpHeldT> {
    prot = ClientProt.OPHELDT;

    decode(buf: Packet) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        const spellComponent = buf.g2();
        return new OpHeldT(obj, slot, component, spellComponent);
    }
}
