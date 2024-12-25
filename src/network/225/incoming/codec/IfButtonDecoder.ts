import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import IfButton from '#/network/incoming/model/IfButton.js';

export default class IfButtonDecoder extends MessageDecoder<IfButton> {
    prot = ClientProt.IF_BUTTON;

    decode(buf: Packet) {
        const component: number = buf.g2();
        return new IfButton(component);
    }
}
