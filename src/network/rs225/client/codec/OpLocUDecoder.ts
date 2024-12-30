import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import OpLocU from '#/network/client/model/OpLocU.js';

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
