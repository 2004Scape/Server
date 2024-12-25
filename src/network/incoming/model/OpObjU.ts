import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class OpObjU extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly x: number, readonly z: number, readonly obj: number,
        readonly useObj: number, readonly useSlot: number, readonly useComponent: number
    ) {
        super();
    }
}
