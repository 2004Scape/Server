import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import IfButton from '#lostcity/network/225/incoming/IfButton.js';

export default class IfButtonDecoder extends MessageDecoder<IfButton> {
    prot = ClientProt.IF_BUTTON;

    decode(buf: Packet) {
        const component: number = buf.g2();
        return new IfButton(component);
    }
}
