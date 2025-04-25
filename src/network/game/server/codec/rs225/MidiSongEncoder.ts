import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import MidiSong from '#/network/game/server/model/MidiSong.js';

export default class MidiSongEncoder extends MessageEncoder<MidiSong> {
    prot = ServerProt.MIDI_SONG;

    encode(buf: Packet, message: MidiSong): void {
        buf.pjstr(message.name);
        buf.p4(message.crc);
        buf.p4(message.length);
    }

    test(message: MidiSong): number {
        return 1 + message.name.length + 4 + 4;
    }
}
