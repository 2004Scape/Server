import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class OpPlayerU extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly pid: number,
        readonly useObj: number, readonly useSlot: number, readonly useComponent: number
    ) {
        super();
    }
}
