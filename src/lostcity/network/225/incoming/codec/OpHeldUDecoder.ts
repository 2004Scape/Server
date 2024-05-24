import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpHeldU from '#lostcity/network/225/incoming/OpHeldU.js';

export default class OpHeldUDecoder extends MessageDecoder<OpHeldU> {
    prot = ClientProt.OPHELDU;

    decode(buf: Packet) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpHeldU(obj, slot, component, useObj, useSlot, useComponent);
    }
}
