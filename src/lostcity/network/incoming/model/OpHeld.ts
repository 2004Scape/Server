import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class OpHeld extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly op: number,
        readonly obj: number, readonly slot: number, readonly component: number
    ) {
        super();
    }
}
