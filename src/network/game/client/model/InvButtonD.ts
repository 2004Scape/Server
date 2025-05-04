import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class InvButtonD extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly component: number,
        readonly slot: number,
        readonly targetSlot: number
    ) {
        super();
    }
}
