import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import NpcInfoChangeType from '#/network/outgoing/model/NpcInfoChangeType.js';

export default class NpcInfoChangeTypeEncoder extends InfoMessageEncoder<NpcInfoChangeType> {
    prot: InfoProt = InfoProt.NPC_CHANGE_TYPE;

    encode(buf: Packet, message: NpcInfoChangeType): void {
        buf.p2(message.type);
    }
}