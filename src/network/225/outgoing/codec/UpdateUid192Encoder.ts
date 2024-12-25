import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateUid192 from '#/network/outgoing/model/UpdateUid192.js';

export default class UpdateUid192Encoder extends MessageEncoder<UpdateUid192> {
    prot = ServerProt.UPDATE_UID192;

    encode(buf: Packet, message: UpdateUid192): void {
        buf.p2(message.uid);
    }
}