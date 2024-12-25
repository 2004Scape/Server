import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class TutorialClickSide extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly tab: number) {
        super();
    }
}
