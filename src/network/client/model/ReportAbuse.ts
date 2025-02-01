import IncomingMessage from '#/network/client/IncomingMessage.js';
import ClientProtCategory from '#/network/client/prot/ClientProtCategory.js';

export default class ReportAbuse extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly offender: bigint,
        readonly reason: number,
        readonly moderatorMute: boolean
    ) {
        super();
    }
}
