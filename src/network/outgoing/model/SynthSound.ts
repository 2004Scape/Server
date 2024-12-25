import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class SynthSound extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly synth: number,
        readonly loops: number,
        readonly delay: number
    ) {
        super();
    }
}