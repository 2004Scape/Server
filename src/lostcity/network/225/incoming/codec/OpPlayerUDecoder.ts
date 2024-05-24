import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpPlayerU from '#lostcity/network/225/incoming/OpPlayerU.js';

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
