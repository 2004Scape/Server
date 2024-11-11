import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';
import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';

export default abstract class InfoMessageEncoder<T extends InfoMessage> extends MessageEncoder<T> {
    abstract prot: InfoProt;
}