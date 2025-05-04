import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class CamLookAt extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly x: number,
        readonly z: number,
        readonly height: number,
        readonly speed: number,
        readonly multiplier: number
    ) {
        super();
    }
}
