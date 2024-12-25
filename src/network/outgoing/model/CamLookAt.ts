import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

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