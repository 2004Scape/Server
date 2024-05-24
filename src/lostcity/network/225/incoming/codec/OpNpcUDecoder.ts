import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpNpcU from '#lostcity/network/225/incoming/OpNpcU.js';

export default class OpNpcUDecoder extends MessageDecoder<OpNpcU> {
    prot = ClientProt.OPNPCU;

    decode(buf: Packet) {
        const nid = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpNpcU(nid, useObj, useSlot, useComponent);
    }
}
