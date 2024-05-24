import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import ResumePCountDialog from '#lostcity/network/225/incoming/ResumePCountDialog.js';

export default class ResumePCountDialogDecoder extends MessageDecoder<ResumePCountDialog> {
    prot = ClientProt.RESUME_P_COUNTDIALOG;

    decode(buf: Packet) {
        const input = buf.g4();
        return new ResumePCountDialog(input);
    }
}
