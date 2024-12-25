import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class IdleTimer extends IncomingMessage {
    category = ClientProtCategory.CLIENT_EVENT;
}
