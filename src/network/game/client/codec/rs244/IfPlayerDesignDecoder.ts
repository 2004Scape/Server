import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import IfPlayerDesign from '#/network/game/client/model/IfPlayerDesign.js';


export default class IfPlayerDesignDecoder extends MessageDecoder<IfPlayerDesign> {
    prot = ClientProt244.IF_PLAYERDESIGN;

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
            color[i] = buf.g1();
        }

        return new IfPlayerDesign(gender, idkit, color);
    }
}
