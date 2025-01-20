import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import SynthSound from '#/network/server/model/SynthSound.js';

export default class SynthSoundEncoder extends MessageEncoder<SynthSound> {
    prot = ServerProt.SYNTH_SOUND;

    encode(buf: Packet, message: SynthSound): void {
        buf.p2(message.synth);
        buf.p1(message.loops);
        buf.p2(message.delay);
    }
}