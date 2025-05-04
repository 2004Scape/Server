import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import CloseModal from '#/network/game/client/model/CloseModal.js';

export default class CloseModalDecoder extends MessageDecoder<CloseModal> {
    prot = ClientProt225.CLOSE_MODAL;

    decode() {
        return new CloseModal();
    }
}
