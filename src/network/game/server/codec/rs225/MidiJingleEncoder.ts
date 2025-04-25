import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import MidiJingle from '#/network/game/server/model/MidiJingle.js';

export default class MidiJingleEncoder extends MessageEncoder<MidiJingle> {
    prot = ServerProt225.MIDI_JINGLE;

    encode(buf: Packet, message: MidiJingle): void {
        buf.p2(message.delay);
        buf.pdata(message.data, 0, message.data.length);
    }

    test(message: MidiJingle): number {
        return 2 + 4 + message.data.length;
    }
}
