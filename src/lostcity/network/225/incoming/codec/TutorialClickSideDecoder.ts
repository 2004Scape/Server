import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import TutorialClickSide from '#lostcity/network/225/incoming/TutorialClickSide.js';

export default class TutorialClickSideDecoder extends MessageDecoder<TutorialClickSide> {
    prot = ClientProt.TUTORIAL_CLICKSIDE;

    decode(buf: Packet) {
        const tab = buf.g1();
        return new TutorialClickSide(tab);
    }
}
