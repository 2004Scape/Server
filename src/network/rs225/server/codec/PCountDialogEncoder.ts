import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import PCountDialog from '#/network/server/model/PCountDialog.js';

export default class PCountDialogEncoder extends MessageEncoder<PCountDialog> {
    prot = ServerProt.P_COUNTDIALOG;

    encode(_: Packet, __: PCountDialog): void {}
}