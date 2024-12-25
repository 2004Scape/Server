import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import InvButton from '#/network/client/model/InvButton.js';

export default class InvButtonDecoder extends MessageDecoder<InvButton> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        return new InvButton(this.op, obj, slot, component);
    }
}
