import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import PCountDialog from '#/network/outgoing/model/PCountDialog.js';

export default class PCountDialogEncoder extends MessageEncoder<PCountDialog> {
    prot = ServerProt.P_COUNTDIALOG;

    encode(_: Packet, __: PCountDialog): void {}
}