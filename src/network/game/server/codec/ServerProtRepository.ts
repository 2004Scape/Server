import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ZoneMessageEncoder from '#/network/game/server/codec/ZoneMessageEncoder.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';
import ZoneMessage from '#/network/game/server/ZoneMessage.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
type GenericOutgoingMessage<T extends OutgoingMessage> = new (...args: any[]) => T;

export default class ServerProtRepository {
    private encoders: Map<GenericOutgoingMessage<OutgoingMessage>, MessageEncoder<OutgoingMessage>> = new Map();

    protected bind<T extends OutgoingMessage>(message: GenericOutgoingMessage<T>, encoder: MessageEncoder<T>) {
        if (this.encoders.has(message)) {
            throw new Error(`[ServerProtRepository] Already defines a ${message.name}.`);
        }
        this.encoders.set(message, encoder);
    }

    getEncoder<T extends OutgoingMessage>(message: T): MessageEncoder<T> | undefined {
        return this.encoders.get(message.constructor as GenericOutgoingMessage<T>);
    }

    getZoneEncoder<T extends ZoneMessage>(message: T): ZoneMessageEncoder<T> | undefined {
        return this.encoders.get(message.constructor as GenericOutgoingMessage<T>) as ZoneMessageEncoder<T> | undefined;
    }
}
