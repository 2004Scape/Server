import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/entity/Player.js';
import CloseModal from '#/network/incoming/model/CloseModal.js';

export default class CloseModalHandler extends MessageHandler<CloseModal> {
    handle(_message: CloseModal, player: Player): boolean {
        player.closeModal();
        return true;
    }
}
