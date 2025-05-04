import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class EventCameraPosition extends IncomingMessage {
    category = ClientProtCategory.CLIENT_EVENT;
}
