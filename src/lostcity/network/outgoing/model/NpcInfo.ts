import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';
import BuildArea from '#lostcity/entity/BuildArea.js';

// this is slightly unsafe.
export default class NpcInfo extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;

    accumulator: number = 0;

    constructor(
        readonly buildArea: BuildArea,
        readonly level: number,
        readonly x: number,
        readonly z: number,
        readonly originX: number,
        readonly originZ: number,
        readonly deltaX: number,
        readonly deltaZ: number,
        readonly changedLevel: boolean
    ) {
        super();
    }
}