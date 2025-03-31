import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, MessagePublic, PlayerInfoProt } from '@2004scape/rsbuf';

import WordEnc from '#/cache/wordenc/WordEnc.js';
import Player from '#/engine/entity/Player.js';
import Packet from '#/io/Packet.js';
import MessageHandler from '#/network/MessageHandler.js';

export default class MessagePublicHandler extends MessageHandler<MessagePublic> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: MessagePublic, player: Player): boolean {
        const { color, effect, input } = message;

        if (player.socialProtect || color < 0 || color > 11 || effect < 0 || effect > 2 || input.length > 100) {
            return false;
        }

        if (player.muted_until !== null && player.muted_until > new Date()) {
            // todo: do we still log their attempt to chat?
            return false;
        }

        const buf: Packet = Packet.alloc(0);
        buf.pdata(input, 0, input.length);
        buf.pos = 0;
        const unpack: string = rsbuf.unpackWords(buf.data, input.length);
        buf.release();

        player.messageColor = color;
        player.messageEffect = effect;
        player.messageType = 0;
        player.logMessage = unpack;
        player.message = rsbuf.packWords(WordEnc.filter(unpack));
        player.masks |= PlayerInfoProt.CHAT;

        player.socialProtect = true;
        return true;
    }
}
