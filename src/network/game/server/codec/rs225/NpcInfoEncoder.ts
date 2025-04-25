import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import NpcInfo from '#/network/game/server/model/NpcInfo.js';

export default class NpcInfoEncoder extends MessageEncoder<NpcInfo> {
    prot = ServerProt225.NPC_INFO;

    encode(buf: Packet, message: NpcInfo): void {
        buf.pdata(message.bytes, 0, message.bytes.length);
    }

    test(message: NpcInfo): number {
        return message.bytes.length;
    }
}
