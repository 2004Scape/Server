import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class AnticheatCycleLogic extends IncomingMessage {
    category = ClientProtCategory.CLIENT_EVENT;
}
