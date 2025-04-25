import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import ResumePCountDialog from '#/network/game/client/model/ResumePCountDialog.js';

export default class ResumePCountDialogDecoder extends MessageDecoder<ResumePCountDialog> {
    prot = ClientProt225.RESUME_P_COUNTDIALOG;

    decode(buf: Packet) {
        const input = buf.g4();
        return new ResumePCountDialog(input);
    }
}
