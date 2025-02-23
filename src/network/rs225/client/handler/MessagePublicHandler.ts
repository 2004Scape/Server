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
        const unpack: string = WordPack.unpack(buf, input.length);
        buf.release();

        player.messageColor = color;
        player.messageEffect = effect;
        player.messageType = 0;
        player.logMessage = unpack;

        const out: Packet = Packet.alloc(0);
        WordPack.pack(out, WordEnc.filter(unpack));
        player.message = new Uint8Array(out.pos);
        out.pos = 0;
        out.gdata(player.message, 0, player.message.length);
        out.release();
        player.masks |= InfoProt.PLAYER_CHAT.id;

        player.socialProtect = true;
        return true;
    }
}
