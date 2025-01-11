import IncomingMessage from '#/network/client/IncomingMessage.js';
import ClientProtCategory from '#/network/client/prot/ClientProtCategory.js';

export default class MessagePublic extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly input: string, readonly color: number, readonly effect: number) {
        super();
    }
}
