import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import CamReset from '#/network/game/server/model/CamReset.js';

export default class CamResetEncoder extends MessageEncoder<CamReset> {
    prot = ServerProt244.CAM_RESET;

    encode(_: Packet, __: CamReset): void {}
}
