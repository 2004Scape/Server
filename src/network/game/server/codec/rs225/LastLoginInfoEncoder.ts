import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import LastLoginInfo from '#/network/game/server/model/LastLoginInfo.js';

export default class LastLoginInfoEncoder extends MessageEncoder<LastLoginInfo> {
    prot = ServerProt225.LAST_LOGIN_INFO;

    encode(buf: Packet, message: LastLoginInfo): void {
        buf.p4(message.lastLoginIp);
        buf.p2(message.daysSinceLogin);
        buf.p1(message.daysSinceRecoveryChange);
        buf.p2(message.unreadMessageCount);
    }
}
