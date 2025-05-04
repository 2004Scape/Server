import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class LastLoginInfo extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly lastLoginIp: number,
        readonly daysSinceLogin: number,
        readonly daysSinceRecoveryChange: number,
        readonly unreadMessageCount: number
    ) {
        super();
    }
}
