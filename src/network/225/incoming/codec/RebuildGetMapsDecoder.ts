import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import RebuildGetMaps from '#/network/incoming/model/RebuildGetMaps.js';

export default class RebuildGetMapsDecoder extends MessageDecoder<RebuildGetMaps> {
    prot = ClientProt.REBUILD_GETMAPS;

    decode(buf: Packet) {
        const maps = [];

        const count = buf.length / 3;
        for (let i = 0; i < count; i++) {
            const type = buf.g1();
            const x = buf.g1();
            const z = buf.g1();
            maps.push({ type, x, z });
        }

        return new RebuildGetMaps(maps);
    }
}
