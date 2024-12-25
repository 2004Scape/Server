import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class ResetAnims extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE; // todo: what should priority be?
}