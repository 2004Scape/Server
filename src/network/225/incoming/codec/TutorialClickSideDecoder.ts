import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import TutorialClickSide from '#/network/incoming/model/TutorialClickSide.js';

export default class TutorialClickSideDecoder extends MessageDecoder<TutorialClickSide> {
    prot = ClientProt.TUTORIAL_CLICKSIDE;

    decode(buf: Packet) {
        const tab = buf.g1();
        return new TutorialClickSide(tab);
    }
}
