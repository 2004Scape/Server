import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default abstract class ZoneMessage extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    protected constructor(readonly coord: number) {
        super();
    }
}
