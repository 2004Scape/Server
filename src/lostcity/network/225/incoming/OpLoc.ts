import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class OpLoc extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly op: number,
        readonly x: number, readonly z: number, readonly loc: number
    ) {
        super();
    }
}
