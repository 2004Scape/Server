import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, MessagePrivate } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import Packet from '#/io/Packet.js';
import MessageHandler from '#/network/MessageHandler.js';
import { fromBase37 } from '#/util/JString.js';

export default class MessagePrivateHandler extends MessageHandler<MessagePrivate> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: MessagePrivate, player: Player): boolean {
        const { username, input } = message;

        if (player.socialProtect || input.length > 100) {
            return false;
        }

        if (player.muted_until !== null && player.muted_until > new Date()) {
            // todo: do we still log their attempt to chat?
            return false;
        }

        if (fromBase37(username) === 'invalid_name') {
            World.notifyPlayerBan('automated', player.username, Date.now() + 172800000);
            return false;
        }

        const buf: Packet = Packet.alloc(0);
        buf.pdata(input, 0, input.length);
        buf.pos = 0;
        World.sendPrivateMessage(player, username, rsbuf.unpackWords(buf.data, input.length));
        buf.release();

        player.socialProtect = true;
        return true;
    }
}
