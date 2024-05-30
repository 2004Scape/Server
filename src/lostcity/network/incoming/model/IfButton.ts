import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class IfButton extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly component: number) {
        super();
    }
}
