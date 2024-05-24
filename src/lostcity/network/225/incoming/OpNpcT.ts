import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class OpNpcT extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly nid: number,
        readonly spellComponent: number
    ) {
        super();
    }
}
