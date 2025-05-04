import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import TutorialClickSide from '#/network/game/client/model/TutorialClickSide.js';

export default class TutorialClickSideDecoder extends MessageDecoder<TutorialClickSide> {
    prot = ClientProt225.TUTORIAL_CLICKSIDE;

    decode(buf: Packet) {
        const tab = buf.g1();
        return new TutorialClickSide(tab);
    }
}
