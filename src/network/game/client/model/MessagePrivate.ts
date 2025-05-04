import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class MessagePrivate extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly username: bigint,
        readonly input: Uint8Array
    ) {
        super();
    }
}
