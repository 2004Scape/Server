import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import EnableTracking from '#/network/outgoing/model/EnableTracking.js';

export default class EnableTrackingEncoder extends MessageEncoder<EnableTracking> {
    prot = ServerProt.ENABLE_TRACKING;

    encode(_: Packet, __: EnableTracking): void {}
}