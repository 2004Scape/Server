import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs225/ClientProt.js';
import RebuildGetMaps from '#/network/game/client/model/RebuildGetMaps.js';

export default class RebuildGetMapsDecoder extends MessageDecoder<RebuildGetMaps> {
    prot = ClientProt.REBUILD_GETMAPS;

    decode(buf: Packet, length: number) {
        const maps = new Int32Array(length / 3);
        for (let i = 0; i < maps.length; i++) {
            maps[i] = buf.g3();
        }
        return new RebuildGetMaps(maps);
    }
}
