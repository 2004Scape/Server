import Packet from '#/io/Packet.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default abstract class MessageDecoder<T extends IncomingMessage> {
    abstract prot: ClientProt225;
    abstract decode(buf: Packet, len: number): T;
}
