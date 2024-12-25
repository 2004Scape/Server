import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class InvButtonD extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly component: number, readonly slot: number, readonly targetSlot: number) {
        super();
    }
}
