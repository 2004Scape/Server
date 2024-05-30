import Packet from '#jagex2/io/Packet.js';
import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';

export default abstract class MessageDecoder<T extends IncomingMessage> {
    abstract prot: ClientProt;
    abstract decode(buf: Packet): T;
}
