import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class MidiJingle extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly delay: number,
        readonly data: Uint8Array
    ) {
        super();
    }
}