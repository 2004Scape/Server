import InfoMessage from '#/network/outgoing/InfoMessage.js';
import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';

export default abstract class InfoMessageEncoder<T extends InfoMessage> extends MessageEncoder<T> {
    abstract prot: InfoProt;
}