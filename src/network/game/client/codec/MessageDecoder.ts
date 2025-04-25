import Packet from '#/io/Packet.js';
import ClientProt from '#/network/game/client/codec/rs225/ClientProt.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default abstract class MessageDecoder<T extends IncomingMessage> {
    abstract prot: ClientProt;
    abstract decode(buf: Packet, len: number): T;
}
