import InfoMessage from '#/network/server/InfoMessage.js';
import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';

export default abstract class InfoMessageEncoder<T extends InfoMessage> extends MessageEncoder<T> {
    abstract prot: InfoProt;
}