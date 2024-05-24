import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpLocU from '#lostcity/network/225/incoming/OpLocU.js';

export default class OpLocUDecoder extends MessageDecoder<OpLocU> {
    prot = ClientProt.OPLOCU;

    decode(buf: Packet) {
        const x = buf.g2();
        const z = buf.g2();
        const loc = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpLocU(x, z, loc, useObj, useSlot, useComponent);
    }
}
