import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import MidiSong from '#/network/game/server/model/MidiSong.js';

export default class MidiSongEncoder extends MessageEncoder<MidiSong> {
    prot = ServerProt244.MIDI_SONG;

    encode(buf: Packet, _message: MidiSong): void {
        buf.p2(-1);
    }

    test(_message: MidiSong): number {
        return 2;
    }
}
