import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import TutOpen from '#/network/game/server/model/TutOpen.js';

export default class TutOpenEncoder extends MessageEncoder<TutOpen> {
    prot = ServerProt.TUT_OPEN;

    encode(buf: Packet, message: TutOpen): void {
        buf.p2(message.component);
    }
}
