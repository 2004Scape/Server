import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import OpHeldU from '#/network/game/client/model/OpHeldU.js';

export default class OpHeldUDecoder extends MessageDecoder<OpHeldU> {
    prot = ClientProt225.OPHELDU;

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
