import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import Logout from '#/network/server/model/Logout.js';

export default class LogoutEncoder extends MessageEncoder<Logout> {
    prot = ServerProt.LOGOUT;

    encode(_: Packet, __: Logout): void {}
}