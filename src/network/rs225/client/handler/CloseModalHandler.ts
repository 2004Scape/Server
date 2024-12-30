import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import CloseModal from '#/network/client/model/CloseModal.js';

export default class CloseModalHandler extends MessageHandler<CloseModal> {
    handle(_message: CloseModal, player: Player): boolean {
        player.closeModal();
        return true;
    }
}
