import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs244/ClientProt.js';
import CloseModal from '#/network/game/client/model/CloseModal.js';


export default class CloseModalDecoder extends MessageDecoder<CloseModal> {
    prot = ClientProt.CLOSE_MODAL;

    decode() {
        return new CloseModal();
    }
}
