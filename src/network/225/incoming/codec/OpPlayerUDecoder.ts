import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import OpPlayerU from '#/network/incoming/model/OpPlayerU.js';

export default class OpPlayerUDecoder extends MessageDecoder<OpPlayerU> {
    prot = ClientProt.OPPLAYERU;

    decode(buf: Packet) {
        const pid = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpPlayerU(pid, useObj, useSlot, useComponent);
    }
}
