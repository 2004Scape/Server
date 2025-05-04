import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UnsetMapFlag from '#/network/game/server/model/UnsetMapFlag.js';

export default class UnsetMapFlagEncoder extends MessageEncoder<UnsetMapFlag> {
    prot = ServerProt225.UNSET_MAP_FLAG;

    encode(_: Packet, __: UnsetMapFlag): void {}
}
