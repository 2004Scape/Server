import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class CamReset extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;
}