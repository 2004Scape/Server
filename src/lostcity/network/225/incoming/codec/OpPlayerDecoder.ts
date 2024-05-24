import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpPlayer from '#lostcity/network/225/incoming/OpPlayer.js';

export default class OpPlayerDecoder extends MessageDecoder<OpPlayer> {
    constructor(readonly prot: ClientProt, readonly op: number) {
        super();
    }

    decode(buf: Packet) {
        const pid = buf.g2();
        return new OpPlayer(this.op, pid);
    }
}
