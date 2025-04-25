import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs244/ClientProt.js';
import IgnoreListDel from '#/network/game/client/model/IgnoreListDel.js';


export default class IgnoreListDelDecoder extends MessageDecoder<IgnoreListDel> {
    prot = ClientProt.IGNORELIST_DEL;

    decode(buf: Packet) {
        const username = buf.g8();
        return new IgnoreListDel(username);
    }
}
