import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import ResetClientVarCache from '#/network/outgoing/model/ResetClientVarCache.js';

export default class ResetClientVarCacheEncoder extends MessageEncoder<ResetClientVarCache> {
    prot = ServerProt.RESET_CLIENT_VARCACHE;

    encode(_: Packet, __: ResetClientVarCache): void {}
}