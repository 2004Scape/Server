import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import CamReset from '#/network/outgoing/model/CamReset.js';

export default class CamResetEncoder extends MessageEncoder<CamReset> {
    prot = ServerProt.CAM_RESET;

    encode(_: Packet, __: CamReset): void {}
}