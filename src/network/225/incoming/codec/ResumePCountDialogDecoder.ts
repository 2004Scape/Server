import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import ResumePCountDialog from '#/network/incoming/model/ResumePCountDialog.js';

export default class ResumePCountDialogDecoder extends MessageDecoder<ResumePCountDialog> {
    prot = ClientProt.RESUME_P_COUNTDIALOG;

    decode(buf: Packet) {
        const input = buf.g4();
        return new ResumePCountDialog(input);
    }
}
