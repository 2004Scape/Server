import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class MessagePrivate extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(
        readonly from: bigint,
        readonly messageId: number,
        readonly staffModLevel: number,
        readonly msg: string
    ) {
        super();
    }
}
