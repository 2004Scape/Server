import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpHeldT from '#lostcity/network/225/incoming/OpHeldT.js';

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
