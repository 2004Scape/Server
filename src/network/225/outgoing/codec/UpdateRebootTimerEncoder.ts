import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateRebootTimer from '#/network/outgoing/model/UpdateRebootTimer.js';

export default class UpdateRebootTimerEncoder extends MessageEncoder<UpdateRebootTimer> {
    prot = ServerProt.UPDATE_REBOOT_TIMER;

    encode(buf: Packet, message: UpdateRebootTimer): void {
        buf.p2(message.ticks);
    }
}