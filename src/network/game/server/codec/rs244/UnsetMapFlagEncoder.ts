import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import UnsetMapFlag from '#/network/game/server/model/UnsetMapFlag.js';

export default class UnsetMapFlagEncoder extends MessageEncoder<UnsetMapFlag> {
    prot = ServerProt.UNSET_MAP_FLAG;

    encode(_: Packet, __: UnsetMapFlag): void {}
}
