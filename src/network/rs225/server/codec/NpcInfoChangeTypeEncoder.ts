import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoChangeType from '#/network/server/model/NpcInfoChangeType.js';

export default class NpcInfoChangeTypeEncoder extends InfoMessageEncoder<NpcInfoChangeType> {
    prot: InfoProt = InfoProt.NPC_CHANGE_TYPE;

    encode(buf: Packet, message: NpcInfoChangeType): void {
        buf.p2(message.type);
    }
}