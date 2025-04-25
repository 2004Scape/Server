import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import InvButton from '#/network/game/client/model/InvButton.js';

export default class InvButtonDecoder extends MessageDecoder<InvButton> {
    constructor(
        readonly prot: ClientProt225,
        readonly op: number
    ) {
        super();
    }

    decode(buf: Packet) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        return new InvButton(this.op, obj, slot, component);
    }
}
