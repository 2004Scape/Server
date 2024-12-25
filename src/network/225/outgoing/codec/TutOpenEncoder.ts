import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import TutOpen from '#/network/outgoing/model/TutOpen.js';

export default class TutOpenEncoder extends MessageEncoder<TutOpen> {
    prot = ServerProt.TUT_OPEN;

    encode(buf: Packet, message: TutOpen): void {
        buf.p2(message.component);
    }
}