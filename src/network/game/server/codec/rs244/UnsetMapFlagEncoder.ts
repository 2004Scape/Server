import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import UnsetMapFlag from '#/network/game/server/model/UnsetMapFlag.js';

export default class UnsetMapFlagEncoder extends MessageEncoder<UnsetMapFlag> {
    prot = ServerProt244.UNSET_MAP_FLAG;

    encode(_: Packet, __: UnsetMapFlag): void {}
}
