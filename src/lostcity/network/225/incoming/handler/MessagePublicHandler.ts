import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import MessagePublic from '#lostcity/network/incoming/model/MessagePublic.js';
import Packet from '#jagex/io/Packet.js';
import WordPack from '#jagex/wordenc/WordPack.js';
import WordEnc from '#lostcity/cache/wordenc/WordEnc.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';

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
