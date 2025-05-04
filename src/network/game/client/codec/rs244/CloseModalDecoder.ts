import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import CloseModal from '#/network/game/client/model/CloseModal.js';


export default class CloseModalDecoder extends MessageDecoder<CloseModal> {
    prot = ClientProt244.CLOSE_MODAL;

    decode() {
        return new CloseModal();
    }
}
