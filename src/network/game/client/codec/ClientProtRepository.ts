import ClientProtBase from '#/network/game/client/codec/ClientProtBase.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import MessageHandler from '#/network/game/client/handler/MessageHandler.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class ClientProtRepository {
    decoders: Map<number, MessageDecoder<IncomingMessage>> = new Map();
    handlers: Map<number, MessageHandler<IncomingMessage>> = new Map();

    protected bind(decoder: MessageDecoder<IncomingMessage>, handler?: MessageHandler<IncomingMessage>) {
        if (this.decoders.has(decoder.prot.id)) {
            throw new Error(`[ClientProtRepository] Already defines a ${decoder.prot.id}.`);
        }

        this.decoders.set(decoder.prot.id, decoder);

        if (handler) {
            this.handlers.set(decoder.prot.id, handler);
        }
    }

    getDecoder(prot: ClientProtBase) {
        return this.decoders.get(prot.id);
    }

    getHandler(prot: ClientProtBase) {
        return this.handlers.get(prot.id);
    }
}
