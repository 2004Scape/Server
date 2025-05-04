import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class DataLoc extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(
        readonly x: number,
        readonly z: number,
        readonly offset: number,
        readonly length: number,
        readonly data: Uint8Array
    ) {
        super();
    }
}
