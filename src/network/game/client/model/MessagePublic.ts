import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class MessagePublic extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly input: Uint8Array,
        readonly color: number,
        readonly effect: number
    ) {
        super();
    }
}
