import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import OpObjU from '#/network/incoming/model/OpObjU.js';

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
