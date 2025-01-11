import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';
import DoublyLinkable from '#/util/DoublyLinkable.js';

export default abstract class OutgoingMessage extends DoublyLinkable {
    readonly abstract priority: ServerProtPriority;
}