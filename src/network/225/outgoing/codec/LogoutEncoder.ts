import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import Logout from '#/network/outgoing/model/Logout.js';

export default class LogoutEncoder extends MessageEncoder<Logout> {
    prot = ServerProt.LOGOUT;

    encode(_: Packet, __: Logout): void {}
}