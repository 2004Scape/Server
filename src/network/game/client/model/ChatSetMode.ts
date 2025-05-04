import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';
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
