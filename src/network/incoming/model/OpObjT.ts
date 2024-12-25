import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class OpObjT extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly x: number, readonly z: number, readonly obj: number,
        readonly spellComponent: number
    ) {
        super();
    }
}
