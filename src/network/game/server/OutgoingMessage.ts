import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';

export default abstract class OutgoingMessage {
    abstract readonly priority: ServerProtPriority;
}
