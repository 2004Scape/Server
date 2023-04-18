import Packet from '#util/Packet.js';

let crcTable = new Packet(9 * 4);

function loadCrcTable() {
    crcTable = new Packet(9 * 4);
    crcTable.p4(0);
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/title')));
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/config')));
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/interface')));
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/media')));
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/models')));
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/textures')));
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/wordenc')));
    crcTable.p4(Packet.crc32(Packet.fromFile('data/cache/sounds')));
}

export {
    crcTable,
    loadCrcTable
};
