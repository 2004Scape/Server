import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import TutOpen from '#lostcity/network/outgoing/model/TutOpen.js';

export default class TutOpenEncoder extends MessageEncoder<TutOpen> {
    prot = ServerProt.TUT_OPEN;

    encode(buf: Packet, message: TutOpen): void {
        buf.p2(message.component);
    }
}