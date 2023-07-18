import Packet from '#jagex2/io/Packet.js';
import Loc from '#lostcity/entity/Loc.js';
import Npc from '#lostcity/entity/Npc.js';
import Obj from '#lostcity/entity/Obj.js';
import Player from '#lostcity/entity/Player.js';
import { ServerProt } from '#lostcity/server/ServerProt.js';
import World from '#lostcity/engine/World.js';
import { Position } from '#lostcity/entity/Position.js';

class ZoneEvent {
    type = -1;
    tick = -1;
    expiration = -1;
    static = false;

    loc: Loc | null = null;
    obj: Obj | null = null;
}

export default class Zone {
    static mapAnim(srcX: number, srcZ: number, id: number, height: number, delay: number) {
        const out = new Packet();
        out.p1(ServerProt.MAP_ANIM);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);
        out.p1(height);
        out.p2(delay);

        return out;
    }

    static mapProjAnim(srcX: number, srcZ: number) {
        const out = new Packet();
        out.p1(ServerProt.MAP_PROJANIM);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));

        // p1 dst x (relative srcX)
        // p1 dst z (relative srcZ)
        // p2 target (> 0 npc, < 0 player, == 0 coord)
        // p2 spotanim
        // p1 src height
        // p1 dst height
        // p2 start
        // p2 end
        // p1 peak
        // p1 arc

        return out;
    }

    static locAdd(srcX: number, srcZ: number, id: number, shape: number, rotation: number) {
        const out = new Packet();
        out.p1(ServerProt.LOC_ADD);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1((shape << 2) | (rotation & 3));
        out.p2(id);

        return out;
    }

    static locDel(srcX: number, srcZ: number, shape: number, rotation: number) {
        const out = new Packet();
        out.p1(ServerProt.LOC_DEL);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1((shape << 2) | (rotation & 3));

        return out;
    }

    // merge player with loc, e.g. agility training through pipes
    static locPlayer(srcX: number, srcZ: number, shape: number, rotation: number) {
        const out = new Packet();
        out.p1(ServerProt.LOC_PLAYER);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));

        // p2 player
        out.p1((shape << 2) | (rotation & 3));
        // p2
        // p2
        // p2
        // p2
        // p1
        // p1
        // p1
        // p1

        return out;
    }

    static locAnim(srcX: number, srcZ: number, shape: number, rotation: number, spotanim: number) {
        const out = new Packet();
        out.p1(ServerProt.LOC_ANIM);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1((shape << 2) | (rotation & 3));
        out.p2(spotanim);

        return out;
    }

    static objAdd(srcX: number, srcZ: number, id: number, count: number) {
        const out = new Packet();
        out.p1(ServerProt.OBJ_ADD);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);
        out.p2(count);

        return out;
    }

    static objCount(srcX: number, srcZ: number, id: number, count: number) {
        const out = new Packet();
        out.p1(ServerProt.OBJ_COUNT);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);
        out.p2(count);

        return out;
    }

    static objDel(srcX: number, srcZ: number, id: number, count: number) {
        const out = new Packet();
        out.p1(ServerProt.OBJ_DEL);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);

        return out;
    }

    static objReveal(srcX: number, srcZ: number, id: number, count: number, receiverId: number) {
        const out = new Packet();
        out.p1(ServerProt.OBJ_REVEAL);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);
        out.p2(count);
        out.p2(receiverId);

        return out;
    }

    index = -1;
    zoneDelta = 0;

    // zone entities
    players: Player[] = [];
    npcs: Npc[] = [];
    staticLocs: Loc[] = []; // source of truth from client map data
    locs: Loc[] = []; // dynamic locs
    staticObjs: Obj[] = []; // source of truth from server map data
    objs: Obj[] = []; // dynamic objs

    // zone events
    events: ZoneEvent[] = [];
    lastEvent = -1; // last update tick, so we can compare player's observed events

    // cached events - sent to players who observe the zone for the first time
    buffer = new Packet();
    lastBuffer = -1; // so we know to regenerate buffer if lastEvent > lastBuffer

    constructor(index: number) {
        this.index = index;
    }

    getBuffer() {
        if (this.lastEvent > this.lastBuffer) {
            this.regenerate();
        }

        return this.buffer;
    }

    regenerate() {
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            if (event.expiration === World.currentTick) {
                this.events.splice(i, 1);
                i--;
                continue;
            }

            if (event.type === ServerProt.LOC_ADD) {
                this.buffer.pdata(Zone.locAdd(event.loc!.x, event.loc!.z, event.loc!.type, event.loc!.shape, event.loc!.rotation));
            } else if (event.type === ServerProt.LOC_DEL) {
                this.buffer.pdata(Zone.locDel(event.loc!.x, event.loc!.z, event.loc!.shape, event.loc!.rotation));
            } else if (event.type === ServerProt.OBJ_ADD) {
                this.buffer.pdata(Zone.objAdd(event.obj!.x, event.obj!.z, event.obj!.type, event.obj!.count));
            } else if (event.type === ServerProt.OBJ_DEL) {
                this.buffer.pdata(Zone.objDel(event.obj!.x, event.obj!.z, event.obj!.type, event.obj!.count));
            }
        }

        this.lastBuffer = World.currentTick;
    }

    getUpdates(sinceTick: number) {
        return this.events.filter(event => event.tick > sinceTick);
    }

    // ---- players/npcs are not zone tracked for events ----

    addPlayer(player: Player) {
        this.players.push(player);
    }

    removePlayer(player: Player) {
        const index = this.players.indexOf(player);
        if (index !== -1) {
            this.players.splice(index, 1);
        }
    }

    addNpc(npc: Npc) {
        this.npcs.push(npc);
    }

    removeNpc(npc: Npc) {
        const index = this.npcs.indexOf(npc);
        if (index !== -1) {
            this.npcs.splice(index, 1);
        }
    }

    // ----

    addStaticLoc(loc: Loc) {
        this.staticLocs.push(loc);
    }

    removeStaticLoc(loc: Loc) {
        let event = new ZoneEvent();
        event.tick = World.currentTick;
        event.type = ServerProt.LOC_DEL;
        event.loc = loc;
        event.static = true;
        this.events.push(event);
        this.lastEvent = World.currentTick;
    }

    // ----

    addLoc(loc: Loc, duration: number) {
        this.locs.push(loc);

        let event = new ZoneEvent();
        event.tick = World.currentTick;
        event.type = ServerProt.LOC_ADD;
        event.loc = loc;
        event.expiration = World.currentTick + duration;
        this.events.push(event);
        this.lastEvent = World.currentTick;
    }

    removeLoc(loc: Loc, duration: number) {
        let event = new ZoneEvent();
        event.tick = World.currentTick;
        event.type = ServerProt.LOC_DEL;
        event.loc = loc;
        event.expiration = World.currentTick + duration;

        const dynamicIndex = this.locs.indexOf(loc);
        if (dynamicIndex !== -1) {
            this.locs.splice(dynamicIndex, 1);
            this.events.push(event);
            this.lastEvent = World.currentTick;
            return;
        }

        const staticIndex = this.staticLocs.indexOf(loc);
        if (staticIndex !== -1) {
            this.staticLocs[staticIndex].respawn = duration;
            this.events.push(event);
            this.lastEvent = World.currentTick;
        }
    }

    // ----

    addStaticObj(obj: Obj) {
        let event = new ZoneEvent();
        event.tick = World.currentTick;
        event.type = ServerProt.OBJ_ADD;
        event.obj = obj;
        event.static = true;
        this.events.push(event);
        this.staticObjs.push(obj);
        this.lastEvent = World.currentTick;
    }

    removeStaticObj(obj: Obj) {
        let event = new ZoneEvent();
        event.tick = World.currentTick;
        event.type = ServerProt.OBJ_DEL;
        event.obj = obj;
        event.static = true;
        this.events.push(event);
        this.lastEvent = World.currentTick;
    }

    // ----

    addObj(obj: Obj) {
        this.objs.push(obj);

        let event = new ZoneEvent();
        event.tick = World.currentTick;
        event.type = ServerProt.OBJ_ADD;
        event.obj = obj;
        this.events.push(event);
        this.lastEvent = World.currentTick;
    }

    removeObj(obj: Obj) {
        const index = this.objs.indexOf(obj);
        if (index !== -1) {
            this.objs.splice(index, 1);

            let event = new ZoneEvent();
            event.tick = World.currentTick;
            event.type = ServerProt.OBJ_DEL;
            event.obj = obj;
            this.events.push(event);
            this.lastEvent = World.currentTick;
        }
    }
}
