import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class OpHeldU extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly obj: number,
        readonly slot: number,
        readonly component: number,
        readonly useObj: number,
        readonly useSlot: number,
        readonly useComponent: number
    ) {
        super();
    }
}
