import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

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