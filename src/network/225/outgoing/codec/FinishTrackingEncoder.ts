import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import FinishTracking from '#/network/outgoing/model/FinishTracking.js';

export default class FinishTrackingEncoder extends MessageEncoder<FinishTracking> {
    prot = ServerProt.FINISH_TRACKING;

    encode(_: Packet, __: FinishTracking): void {}
}