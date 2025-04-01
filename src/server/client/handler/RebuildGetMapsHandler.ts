import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, RebuildGetMaps } from '@2004scape/rsbuf';

import { PRELOADED } from '#/cache/PreloadedPacks.js';
import Player from '#/engine/entity/Player.js';
import MessageHandler from '#/server/client/MessageHandler.js';

export default class RebuildGetMapsHandler extends MessageHandler<RebuildGetMaps> {
    private static readonly CHUNK_SIZE: number = 1000 - 1 - 2 - 1 - 1 - 2 - 2;

    category: ClientProtCategory = ClientProtCategory.RESTRICTED_EVENT;

    handle(message: RebuildGetMaps, player: Player): boolean {
        const { maps: requested } = message;
        const chunk: number = RebuildGetMapsHandler.CHUNK_SIZE;

        for (let i = 0; i < requested.length; i++) {
            const packed: number = requested[i];
            const mapsquare: number = packed & 0xffff;

            const type: number = (packed >> 16) & 0x1;
            const x: number = (mapsquare >> 8) & 0xff;
            const z: number = mapsquare & 0xff;

            if (type === 0) {
                const land = PRELOADED.get(`m${x}_${z}`);
                if (!land) {
                    continue;
                }

                for (let off = 0; off < land.length; off += chunk) {
                    player.write(rsbuf.dataLand(x, z, off, land.length, land.subarray(off, off + chunk)));
                }
                player.write(rsbuf.dataLandDone(x, z));
            } else if (type === 1) {
                const loc = PRELOADED.get(`l${x}_${z}`);
                if (!loc) {
                    continue;
                }

                for (let off = 0; off < loc.length; off += chunk) {
                    player.write(rsbuf.dataLoc(x, z, off, loc.length, loc.subarray(off, off + chunk)));
                }
                player.write(rsbuf.dataLocDone(x, z));
            }
        }

        player.buildArea.rebuildZones();

        return true;
    }
}
