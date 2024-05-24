import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class IfPlayerDesign extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly gender: number, readonly idkit: number[], readonly color: number[]) {
        super();
    }
}
