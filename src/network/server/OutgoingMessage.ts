import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';
import Linkable from '#/util/Linkable.js';

export default abstract class OutgoingMessage extends Linkable {
    readonly abstract priority: ServerProtPriority;
}