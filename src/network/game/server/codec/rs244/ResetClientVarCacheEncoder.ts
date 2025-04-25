import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import ResetClientVarCache from '#/network/game/server/model/ResetClientVarCache.js';

export default class ResetClientVarCacheEncoder extends MessageEncoder<ResetClientVarCache> {
    prot = ServerProt.RESET_CLIENT_VARCACHE;

    encode(_: Packet, __: ResetClientVarCache): void {}
}
