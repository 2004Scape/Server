import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default abstract class InfoMessage extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;
    protected constructor() {
        super();
    }

    get persists(): boolean {
        return false;
    }
}