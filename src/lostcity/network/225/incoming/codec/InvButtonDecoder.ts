import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import InvButton from '#lostcity/network/225/incoming/InvButton.js';

export default class InvButtonDecoder extends MessageDecoder<InvButton> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet): InvButton {
        const item: number = buf.g2();
        const slot: number = buf.g2();
        const component: number = buf.g2();
        return new InvButton(this.op, item, slot, component);
    }
}
