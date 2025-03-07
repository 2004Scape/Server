import { PRELOADED } from '#/cache/PreloadedPacks.js';
import Player from '#/engine/entity/Player.js';
import MessageHandler from '#/network/client/handler/MessageHandler.js';
import RebuildGetMaps from '#/network/client/model/RebuildGetMaps.js';
import DataLand from '#/network/server/model/DataLand.js';
import DataLandDone from '#/network/server/model/DataLandDone.js';
import DataLoc from '#/network/server/model/DataLoc.js';
import DataLocDone from '#/network/server/model/DataLocDone.js';

export default class RebuildGetMapsHandler extends MessageHandler<RebuildGetMaps> {
    private static readonly CHUNK_SIZE: number = 1000 - 1 - 2 - 1 - 1 - 2 - 2;

    handle(message: RebuildGetMaps, player: Player): boolean {
        const { maps: requested } = message;
        const chunk: number = RebuildGetMapsHandler.CHUNK_SIZE;

        for (let i = 0; i < requested.length; i++) {
            const { type, x, z } = requested[i];

            if (type === 0) {
                const land = PRELOADED.get(`m${x}_${z}`);
                if (!land) {
                    continue;
                }

                for (let off = 0; off < land.length; off += chunk) {
                    player.write(new DataLand(x, z, off, land.length, land.subarray(off, off + chunk)));
                }
                player.write(new DataLandDone(x, z));
            } else if (type === 1) {
                const loc = PRELOADED.get(`l${x}_${z}`);
                if (!loc) {
                    continue;
                }

                for (let off = 0; off < loc.length; off += chunk) {
                    player.write(new DataLoc(x, z, off, loc.length, loc.subarray(off, off + chunk)));
                }
                player.write(new DataLocDone(x, z));
            }
        }

        player.rebuildZones();

        return true;
    }
}
