import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class TutorialFlashSide extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(readonly tab: number) {
        super();
    }
}