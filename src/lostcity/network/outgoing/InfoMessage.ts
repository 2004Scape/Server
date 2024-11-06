import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default abstract class InfoMessage extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;
    protected constructor() {
        super();
    }

    get persists(): boolean {
        return false;
    }
}