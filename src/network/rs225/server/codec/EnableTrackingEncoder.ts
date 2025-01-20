import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import EnableTracking from '#/network/server/model/EnableTracking.js';

export default class EnableTrackingEncoder extends MessageEncoder<EnableTracking> {
    prot = ServerProt.ENABLE_TRACKING;

    encode(_: Packet, __: EnableTracking): void {}
}