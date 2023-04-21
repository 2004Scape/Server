import World from '#engine/World.js';
import { ServerProt, ServerProtOpcodeFromID } from '#enum/ServerProt.js';
import Packet from '#util/Packet.js';
import { Position } from '#util/Position.js';

export default class ZoneUpdate {
    execute(player) {
        // TODO: account for plane changes

        // TOOD: trigger on zone update (always runs every tick)
        // lazily forcing a full zone update to see if it works at all

        // need to know the build area bounds so we don't exceed it
        let leftX = Position.zone(player.lastX) - 6;
        let rightX = Position.zone(player.lastX) + 6;
        let topZ = Position.zone(player.lastZ) + 6;
        let bottomZ = Position.zone(player.lastZ) - 6;

        // update 3 zones around the player
        for (let x = Position.zone(player.x) - 3; x <= Position.zone(player.x) + 3; x++) {
            for (let z = Position.zone(player.z) - 3; z <= Position.zone(player.z) + 3; z++) {
                // check if the zone is within the build area
                if (x < leftX || x > rightX || z > topZ || z < bottomZ) {
                    continue;
                }

                let zone = World.getZone(x, z, player.plane);
                if (!zone.events) {
                    continue;
                }

                if (!player.hasObservedZone(x, z, player.plane)) {
                    player.sendZoneFullFollows(x << 3, z << 3);
                    player.sendZoneEvents(zone.getEvents());
                    player.observeZone(x, z, player.plane);
                    continue;
                }

                player.sendZonePartialFollows(x << 3, z << 3);
                player.sendZoneEvents(zone.getEventsAfter(player.lastObservedZone(x, z, player.plane)));

                // player.sendZonePartialEnclosed(x << 3, z << 3, zone.events);
            }
        }
    }
}
