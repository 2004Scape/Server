import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import FinishTracking from '#/network/game/server/model/FinishTracking.js';

export default class FinishTrackingEncoder extends MessageEncoder<FinishTracking> {
    prot = ServerProt225.FINISH_TRACKING;

    encode(_: Packet, __: FinishTracking): void {}
}
