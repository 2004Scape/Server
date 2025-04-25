import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import Logout from '#/network/game/server/model/Logout.js';

export default class LogoutEncoder extends MessageEncoder<Logout> {
    prot = ServerProt225.LOGOUT;

    encode(_: Packet, __: Logout): void {}
}
