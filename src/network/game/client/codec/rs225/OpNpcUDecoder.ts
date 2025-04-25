import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import OpNpcU from '#/network/game/client/model/OpNpcU.js';

export default class OpNpcUDecoder extends MessageDecoder<OpNpcU> {
    prot = ClientProt225.OPNPCU;

    decode(buf: Packet) {
        const nid = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpNpcU(nid, useObj, useSlot, useComponent);
    }
}
