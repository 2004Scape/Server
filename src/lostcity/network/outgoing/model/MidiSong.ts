import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default class MidiSong extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly name: string,
        readonly crc: number,
        readonly length: number
    ) {
        super();
    }
}