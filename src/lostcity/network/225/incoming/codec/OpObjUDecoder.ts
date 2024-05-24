import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpObjU from '#lostcity/network/225/incoming/OpObjU.js';

export default class OpObjUDecoder extends MessageDecoder<OpObjU> {
    prot = ClientProt.OPOBJU;

    decode(buf: Packet) {
        const x = buf.g2();
        const z = buf.g2();
        const obj = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpObjU(x, z, obj, useObj, useSlot, useComponent);
    }
}
