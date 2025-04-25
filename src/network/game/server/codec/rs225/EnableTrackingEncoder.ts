import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import EnableTracking from '#/network/game/server/model/EnableTracking.js';

export default class EnableTrackingEncoder extends MessageEncoder<EnableTracking> {
    prot = ServerProt225.ENABLE_TRACKING;

    encode(_: Packet, __: EnableTracking): void {}
}
