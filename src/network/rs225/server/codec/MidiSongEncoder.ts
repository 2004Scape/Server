import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import MidiSong from '#/network/server/model/MidiSong.js';

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