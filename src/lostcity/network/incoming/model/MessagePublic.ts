import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class MessagePublic extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly input: string, readonly color: number, readonly effect: number) {
        super();
    }
}
