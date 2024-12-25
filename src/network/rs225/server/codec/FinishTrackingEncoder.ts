import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import FinishTracking from '#/network/server/model/FinishTracking.js';

export default class FinishTrackingEncoder extends MessageEncoder<FinishTracking> {
    prot = ServerProt.FINISH_TRACKING;

    encode(_: Packet, __: FinishTracking): void {}
}