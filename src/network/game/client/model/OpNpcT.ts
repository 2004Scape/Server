import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class OpNpcT extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly nid: number,
        readonly spellComponent: number
    ) {
        super();
    }
}
