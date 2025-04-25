import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs244/ClientProt.js';
import IgnoreListAdd from '#/network/game/client/model/IgnoreListAdd.js';


export default class IgnoreListAddDecoder extends MessageDecoder<IgnoreListAdd> {
    prot = ClientProt.IGNORELIST_ADD;

    decode(buf: Packet) {
        const username = buf.g8();
        return new IgnoreListAdd(username);
    }
}
