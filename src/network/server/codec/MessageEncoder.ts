import OutgoingMessage from '#/network/server/OutgoingMessage.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import Packet from '#/io/Packet.js';

export default abstract class MessageEncoder<T extends OutgoingMessage> {
    abstract prot: ServerProt;
    abstract encode(buf: Packet, message: T): void;
    test(_: T): number {
        return this.prot.length;
    }
}