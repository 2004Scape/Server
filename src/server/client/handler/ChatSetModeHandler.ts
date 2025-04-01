import { ChatSetMode, ClientProtCategory } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import MessageHandler from '#/server/client/MessageHandler.js';

export default class ChatSetModeHandler extends MessageHandler<ChatSetMode> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: ChatSetMode, player: Player): boolean {
        const { public: publicChat, private: privateChat, trade } = message;
        
        player.publicChat = publicChat;
        player.privateChat = privateChat;
        player.tradeDuel = trade;

        World.sendPrivateChatModeToFriendsServer(player);

        return true;
    }
}
