import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class EventTracking extends IncomingMessage {
    category = ClientProtCategory.CLIENT_EVENT;
}
