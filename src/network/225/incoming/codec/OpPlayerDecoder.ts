import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import OpPlayer from '#/network/incoming/model/OpPlayer.js';

export default class OpPlayerDecoder extends MessageDecoder<OpPlayer> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet) {
        const pid = buf.g2();
        return new OpPlayer(this.op, pid);
    }
}
