import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import CloseModal from '#/network/client/model/CloseModal.js';

export default class CloseModalDecoder extends MessageDecoder<CloseModal> {
    prot = ClientProt.CLOSE_MODAL;

    decode() {
        return new CloseModal();
    }
}
