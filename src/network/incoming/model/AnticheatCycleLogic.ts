import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class AnticheatCycleLogic extends IncomingMessage {
    category = ClientProtCategory.CLIENT_EVENT;
}
