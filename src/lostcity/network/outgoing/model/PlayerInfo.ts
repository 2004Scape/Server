import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';
import BuildArea from '#lostcity/entity/BuildArea.js';

// this is slightly unsafe.
export default class PlayerInfo extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;

    accumulator: number = 0;

    constructor(
        readonly buildArea: BuildArea,
        readonly level: number,
        readonly x: number,
        readonly z: number,
        readonly originX: number,
        readonly originZ: number,
        readonly uid: number,
        readonly mask: number,
        readonly tele: boolean,
        readonly jump: boolean,
        readonly walkDir: number,
        readonly runDir: number,
        readonly deltaX: number,
        readonly deltaZ: number,
        readonly changedLevel: boolean
    ) {
        super();
    }
}