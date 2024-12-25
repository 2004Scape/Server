import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UnsetMapFlag from '#/network/outgoing/model/UnsetMapFlag.js';

export default class UnsetMapFlagEncoder extends MessageEncoder<UnsetMapFlag> {
    prot = ServerProt.UNSET_MAP_FLAG;

    encode(_: Packet, __: UnsetMapFlag): void {}
}