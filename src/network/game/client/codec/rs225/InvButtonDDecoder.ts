import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import InvButtonD from '#/network/game/client/model/InvButtonD.js';

export default class InvButtonDDecoder extends MessageDecoder<InvButtonD> {
    prot = ClientProt225.INV_BUTTOND;

    decode(buf: Packet) {
        const component = buf.g2();
        const slot = buf.g2();
        const targetSlot = buf.g2();
        return new InvButtonD(component, slot, targetSlot);
    }
}
