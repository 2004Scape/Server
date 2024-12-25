import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import InvButtonD from '#/network/incoming/model/InvButtonD.js';

export default class InvButtonDDecoder extends MessageDecoder<InvButtonD> {
    prot = ClientProt.INV_BUTTOND;

    decode(buf: Packet) {
        const component = buf.g2();
        const slot = buf.g2();
        const targetSlot = buf.g2();
        return new InvButtonD(component, slot, targetSlot);
    }
}
