import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import SynthSound from '#/network/game/server/model/SynthSound.js';

export default class SynthSoundEncoder extends MessageEncoder<SynthSound> {
    prot = ServerProt244.SYNTH_SOUND;

    encode(buf: Packet, message: SynthSound): void {
        buf.p2(message.synth);
        buf.p1(message.loops);
        buf.p2(message.delay);
    }
}
