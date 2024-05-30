import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import CloseModal from '#lostcity/network/incoming/model/CloseModal.js';

export default class CloseModalHandler extends MessageHandler<CloseModal> {
    handle(_message: CloseModal, player: Player): boolean {
        player.closeModal();
        return true;
    }
}
