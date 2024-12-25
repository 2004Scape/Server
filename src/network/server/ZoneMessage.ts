import OutgoingMessage from '#/network/server/OutgoingMessage.js';
import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';

export default abstract class ZoneMessage extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;
    protected constructor(readonly coord: number) {
        super();
    }
}