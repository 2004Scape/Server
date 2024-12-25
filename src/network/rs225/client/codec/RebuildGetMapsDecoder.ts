import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import RebuildGetMaps from '#/network/client/model/RebuildGetMaps.js';

export default class RebuildGetMapsDecoder extends MessageDecoder<RebuildGetMaps> {
    prot = ClientProt.REBUILD_GETMAPS;

    decode(buf: Packet, length: number) {
        const maps = [];

        const count = length / 3;
        for (let i = 0; i < count; i++) {
            const type = buf.g1();
            const x = buf.g1();
            const z = buf.g1();
            maps.push({ type, x, z });
        }

        return new RebuildGetMaps(maps);
    }
}
