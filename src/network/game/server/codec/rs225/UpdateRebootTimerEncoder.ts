import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdateRebootTimer from '#/network/game/server/model/UpdateRebootTimer.js';

export default class UpdateRebootTimerEncoder extends MessageEncoder<UpdateRebootTimer> {
    prot = ServerProt225.UPDATE_REBOOT_TIMER;

    encode(buf: Packet, message: UpdateRebootTimer): void {
        buf.p2(message.ticks);
    }
}
