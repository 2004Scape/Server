import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import OpPlayer from '#/network/game/client/model/OpPlayer.js';


export default class OpPlayerDecoder extends MessageDecoder<OpPlayer> {
    constructor(
        readonly prot: ClientProt244,
        readonly op: number
    ) {
        super();
    }

    decode(buf: Packet) {
        const pid = buf.g2();
        return new OpPlayer(this.op, pid);
    }
}
