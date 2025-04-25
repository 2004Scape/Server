import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import MidiJingle from '#/network/game/server/model/MidiJingle.js';

export default class MidiJingleEncoder extends MessageEncoder<MidiJingle> {
    prot = ServerProt244.MIDI_JINGLE;

    encode(buf: Packet, message: MidiJingle): void {
        buf.p2(-1);
        buf.p2(message.delay);
    }

    test(_message: MidiJingle): number {
        return 4;
    }
}
