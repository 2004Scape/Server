import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class IfPlayerDesign extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly gender: number, readonly idkit: number[], readonly color: number[]) {
        super();
    }
}
