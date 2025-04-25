import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import ReportAbuse from '#/network/game/client/model/ReportAbuse.js';


export default class ReportAbuseDecoder extends MessageDecoder<ReportAbuse> {
    prot = ClientProt244.REPORT_ABUSE;

    decode(buf: Packet) {
        const offender = buf.g8();
        const reason = buf.g1();
        const moderatorMute = buf.gbool();

        return new ReportAbuse(offender, reason, moderatorMute);
    }
}
