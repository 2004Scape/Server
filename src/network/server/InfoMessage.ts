import OutgoingMessage from '#/network/server/OutgoingMessage.js';
import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';

export default abstract class InfoMessage extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;
    protected constructor() {
        super();
    }

    get persists(): boolean {
        return false;
    }
}