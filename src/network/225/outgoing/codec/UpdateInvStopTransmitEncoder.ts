import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateInvStopTransmit from '#/network/outgoing/model/UpdateInvStopTransmit.js';

export default class UpdateInvStopTransmitEncoder extends MessageEncoder<UpdateInvStopTransmit> {
    prot = ServerProt.UPDATE_INV_STOP_TRANSMIT;

    encode(buf: Packet, message: UpdateInvStopTransmit): void {
        buf.p2(message.component);
    }
}