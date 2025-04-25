import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import PCountDialog from '#/network/game/server/model/PCountDialog.js';

export default class PCountDialogEncoder extends MessageEncoder<PCountDialog> {
    prot = ServerProt.P_COUNTDIALOG;

    encode(_: Packet, __: PCountDialog): void {}
}
