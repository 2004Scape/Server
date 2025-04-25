import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import OpHeld from '#/network/game/client/model/OpHeld.js';


export default class OpHeldDecoder extends MessageDecoder<OpHeld> {
    constructor(
        readonly prot: ClientProt244,
        readonly op: number
    ) {
        super();
    }

    decode(buf: Packet) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        return new OpHeld(this.op, obj, slot, component);
    }
}
