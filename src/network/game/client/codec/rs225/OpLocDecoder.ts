import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs225/ClientProt.js';
import OpLoc from '#/network/game/client/model/OpLoc.js';

export default class OpLocDecoder extends MessageDecoder<OpLoc> {
    constructor(
        readonly prot: ClientProt,
        readonly op: number
    ) {
        super();
    }

    decode(buf: Packet) {
        const x = buf.g2();
        const z = buf.g2();
        const loc = buf.g2();
        return new OpLoc(this.op, x, z, loc);
    }
}
