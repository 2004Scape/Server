import Packet from '#/io/Packet.js';
import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';

export default abstract class MessageDecoder<T extends IncomingMessage> {
    abstract prot: ClientProt;
    abstract decode(buf: Packet): T;
}
