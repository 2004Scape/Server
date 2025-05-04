import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import UpdateInvStopTransmit from '#/network/game/server/model/UpdateInvStopTransmit.js';

export default class UpdateInvStopTransmitEncoder extends MessageEncoder<UpdateInvStopTransmit> {
    prot = ServerProt244.UPDATE_INV_STOP_TRANSMIT;

    encode(buf: Packet, message: UpdateInvStopTransmit): void {
        buf.p2(message.component);
    }
}
