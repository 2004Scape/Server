import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import IfPlayerDesign from '#lostcity/network/225/incoming/IfPlayerDesign.js';

export default class IfPlayerDesignDecoder extends MessageDecoder<IfPlayerDesign> {
    prot = ClientProt.IF_PLAYERDESIGN;

    decode(buf: Packet) {
        const gender = buf.g1();

        const idkit: number[] = [];
        for (let i = 0; i < 7; i++) {
            idkit[i] = buf.g1();

            if (idkit[i] === 255) {
                idkit[i] = -1;
            }
        }

        const color: number[] = [];
        for (let i = 0; i < 5; i++) {
            idkit[i] = buf.g1();
        }

        return new IfPlayerDesign(gender, idkit, color);
    }
}
