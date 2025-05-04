import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import RebuildGetMaps from '#/network/game/client/model/RebuildGetMaps.js';

export default class RebuildGetMapsDecoder extends MessageDecoder<RebuildGetMaps> {
    prot = ClientProt225.REBUILD_GETMAPS;

    decode(buf: Packet, length: number) {
        const maps = new Int32Array(length / 3);
        for (let i = 0; i < maps.length; i++) {
            maps[i] = buf.g3();
        }
        return new RebuildGetMaps(maps);
    }
}
