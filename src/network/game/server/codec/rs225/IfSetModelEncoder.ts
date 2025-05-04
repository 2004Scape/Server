import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfSetModel from '#/network/game/server/model/IfSetModel.js';

export default class IfSetModelEncoder extends MessageEncoder<IfSetModel> {
    prot = ServerProt225.IF_SETMODEL;

    encode(buf: Packet, message: IfSetModel): void {
        buf.p2(message.component);
        buf.p2(message.model);
    }
}
