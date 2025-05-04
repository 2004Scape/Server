import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import OpPlayerU from '#/network/game/client/model/OpPlayerU.js';

export default class OpPlayerUDecoder extends MessageDecoder<OpPlayerU> {
    prot = ClientProt225.OPPLAYERU;

    decode(buf: Packet) {
        const pid = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpPlayerU(pid, useObj, useSlot, useComponent);
    }
}
