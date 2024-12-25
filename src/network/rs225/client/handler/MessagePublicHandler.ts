import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import MessagePublic from '#/network/client/model/MessagePublic.js';
import Packet from '#/io/Packet.js';
import WordPack from '#/wordenc/WordPack.js';
import WordEnc from '#/cache/wordenc/WordEnc.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';

export default class MessagePublicHandler extends MessageHandler<MessagePublic> {
    handle(message: MessagePublic, player: Player): boolean {
        const { color, effect, input } = message;
        if (color < 0 || color > 11 || effect < 0 || effect > 2 || input.length > 100) {
            return false;
        }

        player.messageColor = color;
        player.messageEffect = effect;
        player.messageType = 0;

        const out = Packet.alloc(0);
        WordPack.pack(out, WordEnc.filter(input));
        player.message = new Uint8Array(out.pos);
        out.pos = 0;
        out.gdata(player.message, 0, player.message.length);
        out.release();
        player.masks |= InfoProt.PLAYER_CHAT.id;
        return true;
    }
}
