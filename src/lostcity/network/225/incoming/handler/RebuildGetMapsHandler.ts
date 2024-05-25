import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import { PRELOADED } from '#lostcity/entity/PreloadedPacks.js';
import RebuildGetMaps from '#lostcity/network/incoming/model/RebuildGetMaps.js';
import ServerProt from '#lostcity/server/ServerProt.js';

export default class RebuildGetMapsHandler extends MessageHandler<RebuildGetMaps> {
    handle(message: RebuildGetMaps, player: Player): boolean {
        const { maps: requested } = message;

        for (let i = 0; i < requested.length; i++) {
            const { type, x, z } = requested[i];

            const CHUNK_SIZE = 1000 - 1 - 2 - 1 - 1 - 2 - 2;
            if (type == 0) {
                const land = PRELOADED.get(`m${x}_${z}`);
                if (!land) {
                    continue;
                }

                for (let off = 0; off < land.length; off += CHUNK_SIZE) {
                    player.writeHighPriority(ServerProt.DATA_LAND, x, z, off, land.length, land.subarray(off, off + CHUNK_SIZE));
                }

                player.writeHighPriority(ServerProt.DATA_LAND_DONE, x, z);
            } else if (type == 1) {
                const loc = PRELOADED.get(`l${x}_${z}`);
                if (!loc) {
                    continue;
                }

                for (let off = 0; off < loc.length; off += CHUNK_SIZE) {
                    player.writeHighPriority(ServerProt.DATA_LOC, x, z, off, loc.length, loc.subarray(off, off + CHUNK_SIZE));
                }

                player.writeHighPriority(ServerProt.DATA_LOC_DONE, x, z);
            }
        }

        return true;
    }
}
