import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class OpHeldT extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly obj: number, readonly slot: number, readonly component: number,
        readonly spellComponent: number
    ) {
        super();
    }
}
