import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';
import DoublyLinkable from '#jagex/datastruct/DoublyLinkable.js';

export default abstract class OutgoingMessage extends DoublyLinkable {
    readonly abstract priority: ServerProtPriority;
}