import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class InvButton extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly op: number,
        readonly obj: number, readonly slot: number, readonly component: number
    ) {
        super();
    }
}
