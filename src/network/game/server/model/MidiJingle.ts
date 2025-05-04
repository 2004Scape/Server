import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class MidiJingle extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly delay: number,
        readonly data: Uint8Array
    ) {
        super();
    }
}
