import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdateIgnoreList from '#/network/game/server/model/UpdateIgnoreList.js';

export default class UpdateIgnoreListEncoder extends MessageEncoder<UpdateIgnoreList> {
    prot = ServerProt225.UPDATE_IGNORELIST;

    encode(buf: Packet, message: UpdateIgnoreList): void {
        for (const name of message.names) {
            buf.p8(name);
        }
    }

    test(message: UpdateIgnoreList): number {
        return 8 * message.names.length;
    }
}
