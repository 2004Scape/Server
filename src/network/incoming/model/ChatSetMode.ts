import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';
import { ChatModePrivate, ChatModePublic, ChatModeTradeDuel } from '#/util/ChatModes.js';

export default class ChatSetMode extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly publicChat: ChatModePublic,
        readonly privateChat: ChatModePrivate,
        readonly tradeDuel: ChatModeTradeDuel
    ) {
        super();
    }
}
