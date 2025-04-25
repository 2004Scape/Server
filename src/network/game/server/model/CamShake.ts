import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class CamShake extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly type: number,
        readonly jitter: number,
        readonly amplitude: number,
        readonly frequency: number
    ) {
        super();
    }
}
