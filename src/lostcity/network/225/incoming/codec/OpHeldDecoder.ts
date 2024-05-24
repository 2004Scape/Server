import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpHeld from '#lostcity/network/225/incoming/OpHeld.js';

export default class OpHeldDecoder extends MessageDecoder<OpHeld> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        return new OpHeld(this.op, obj, slot, component);
    }
}
