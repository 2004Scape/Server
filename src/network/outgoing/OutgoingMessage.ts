import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';
import DoublyLinkable from '#/datastruct/DoublyLinkable.js';

export default abstract class OutgoingMessage extends DoublyLinkable {
    readonly abstract priority: ServerProtPriority;
}