import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';
import DoublyLinkable from '#/util/DoublyLinkable.js';

export default abstract class OutgoingMessage extends DoublyLinkable {
    readonly abstract priority: ServerProtPriority;
}