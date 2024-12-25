import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateIgnoreList from '#/network/outgoing/model/UpdateIgnoreList.js';

export default class UpdateIgnoreListEncoder extends MessageEncoder<UpdateIgnoreList> {
    prot = ServerProt.UPDATE_IGNORELIST;

    encode(buf: Packet, message: UpdateIgnoreList): void {
        for (const name of message.names) {
            buf.p8(name);
        }
    }

    test(message: UpdateIgnoreList): number {
        return 8 * message.names.length;
    }
}