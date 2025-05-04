import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class EventTracking extends IncomingMessage {
    category = ClientProtCategory.RESTRICTED_EVENT;

    constructor(readonly bytes: Uint8Array) {
        super();
    }
}
