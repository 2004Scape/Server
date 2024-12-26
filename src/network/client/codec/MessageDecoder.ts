import Packet from '#/io/Packet.js';
import IncomingMessage from '#/network/client/IncomingMessage.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';

export default abstract class MessageDecoder<T extends IncomingMessage> {
    abstract prot: ClientProt;
    abstract decode(buf: Packet, len: number): T;
}
