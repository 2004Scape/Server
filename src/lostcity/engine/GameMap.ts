import Packet from "#jagex2/io/Packet.js";
import Npc from "#lostcity/entity/Npc.js";
import fs from "fs";
import World from "#lostcity/engine/World.js";
import CollisionManager from "#lostcity/engine/collision/CollisionManager.js";

export default class GameMap {
    readonly collisionManager: CollisionManager = new CollisionManager();

    init() {
        console.time('Loading game map');
        this.collisionManager.init()

        const maps = fs.readdirSync('data/pack/server/maps').filter(x => x[0] === 'm');
        for (let index = 0; index < maps.length; index++) {
            const [fileX, fileZ] = maps[index].substring(1).split('_').map(x => parseInt(x));
            const mapsquareX = fileX << 6
            const mapsquareZ = fileZ << 6

            const npcMap = Packet.load(`data/pack/server/maps/n${fileX}_${fileZ}`);
            while (npcMap.available > 0) {
                const pos = npcMap.g2();
                const level = (pos >> 12) & 0x3;
                const localX = (pos >> 6) & 0x3F;
                const localZ = (pos & 0x3F);

                const count = npcMap.g1();
                for (let j = 0; j < count; j++) {
                    const id = npcMap.g2();

                    const npc = new Npc();
                    npc.nid = World.getNextNid();
                    npc.type = id;
                    npc.startX = mapsquareX + localX;
                    npc.startZ = mapsquareZ + localZ;
                    npc.x = npc.startX;
                    npc.z = npc.startZ;
                    npc.level = level;

                    World.npcs[npc.nid] = npc;
                }
            }

            const objMap = Packet.load(`data/pack/server/maps/o${fileX}_${fileZ}`);
            while (objMap.available > 0) {
                const pos = objMap.g2();
                const level = (pos >> 12) & 0x3;
                const localX = (pos >> 6) & 0x3F;
                const localZ = (pos & 0x3F);

                const count = objMap.g1();
                for (let j = 0; j < count; j++) {
                    const id = objMap.g1();
                }
            }
        }

        console.timeEnd('Loading game map');
    }
}
