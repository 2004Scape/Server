import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import OpObjU from '#/network/client/model/OpObjU.js';

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
