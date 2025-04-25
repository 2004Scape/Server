import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import Logout from '#/network/game/server/model/Logout.js';

export default class LogoutEncoder extends MessageEncoder<Logout> {
    prot = ServerProt.LOGOUT;

    encode(_: Packet, __: Logout): void {}
}
