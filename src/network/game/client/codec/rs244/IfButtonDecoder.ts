import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import IfButton from '#/network/game/client/model/IfButton.js';


export default class IfButtonDecoder extends MessageDecoder<IfButton> {
    prot = ClientProt244.IF_BUTTON;

    decode(buf: Packet) {
        const component: number = buf.g2();
        return new IfButton(component);
    }
}
