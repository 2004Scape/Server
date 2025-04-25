import Packet from '#/io/Packet.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default abstract class MessageEncoder<T extends OutgoingMessage> {
    abstract prot: ServerProt;
    abstract encode(buf: Packet, message: T): void;
    test(_: T): number {
        return this.prot.length;
    }
}
