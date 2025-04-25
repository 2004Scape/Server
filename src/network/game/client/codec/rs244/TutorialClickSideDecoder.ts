import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs244/ClientProt.js';
import TutorialClickSide from '#/network/game/client/model/TutorialClickSide.js';


export default class TutorialClickSideDecoder extends MessageDecoder<TutorialClickSide> {
    prot = ClientProt.TUTORIAL_CLICKSIDE;

    decode(buf: Packet) {
        const tab = buf.g1();
        return new TutorialClickSide(tab);
    }
}
