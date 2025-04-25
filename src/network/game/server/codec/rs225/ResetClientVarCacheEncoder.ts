import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import ResetClientVarCache from '#/network/game/server/model/ResetClientVarCache.js';

export default class ResetClientVarCacheEncoder extends MessageEncoder<ResetClientVarCache> {
    prot = ServerProt225.RESET_CLIENT_VARCACHE;

    encode(_: Packet, __: ResetClientVarCache): void {}
}
