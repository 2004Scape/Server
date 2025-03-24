import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';

export default abstract class OutgoingMessage {
    abstract readonly priority: ServerProtPriority;
}
