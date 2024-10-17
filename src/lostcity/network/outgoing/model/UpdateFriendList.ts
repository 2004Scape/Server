import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateFriendList extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly name: bigint,
        readonly nodeId: number
    ) {
        super();
    }
}