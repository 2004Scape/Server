import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default abstract class ZoneMessage extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;
    protected constructor(readonly coord: number) {
        super();
    }
}