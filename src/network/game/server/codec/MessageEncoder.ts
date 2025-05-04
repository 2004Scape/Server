import Packet from '#/io/Packet.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default abstract class MessageEncoder<T extends OutgoingMessage> {
    abstract prot: ServerProt225;
    abstract encode(buf: Packet, message: T): void;
    test(_: T): number {
        return this.prot.length;
    }
}
