import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import CloseModal from '#/network/incoming/model/CloseModal.js';

export default class CloseModalDecoder extends MessageDecoder<CloseModal> {
    prot = ClientProt.CLOSE_MODAL;

    decode() {
        return new CloseModal();
    }
}
