import Packet from '#jagex2/io/Packet.js';

import Loc from '#lostcity/entity/Loc.js';
import Npc from '#lostcity/entity/Npc.js';
import Obj from '#lostcity/entity/Obj.js';
import Player from '#lostcity/entity/Player.js';
import PathingEntity from '#lostcity/entity/PathingEntity.js';

import ServerProt from '#lostcity/server/ServerProt.js';

import World from '#lostcity/engine/World.js';
import ZoneManager from '#lostcity/engine/zone/ZoneManager.js';

import * as rsmod from '@2004scape/rsmod-pathfinder';
import LinkList from '#jagex2/datastruct/LinkList.js';
import ObjType from '#lostcity/cache/config/ObjType.js';
import EntityLifeCycle from '#lostcity/entity/EntityLifeCycle.js';

export class ZoneEvent {
    type = -1;
    receiverId = -1;
    buffer: Packet = new Packet(new Uint8Array());
    tick = -1;
    subjectType = -1;

    // temp
    x = -1;
    z = -1;

    // loc
    layer = -1;

    constructor(type: number) {
        this.type = type;
    }
}

export default class Zone {
    static mapAnim(srcX: number, srcZ: number, id: number, height: number, delay: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 2 + 1 + 2));
        out.p1(ServerProt.MAP_ANIM.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);
        out.p1(height);
        out.p2(delay);

        return out;
    }

    // variables fully broken out for now
    //coord $from, coord $to, spotanim $spotanim, int $fromHeight, int $toHeight, int $startDelay, int $endDelay, int $peak, int $arc
    static mapProjAnim(srcX: number, srcZ: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 1 + 1 + 2 + 2 + 1 + 1 + 2 + 2 + 1 + 1));
        out.p1(ServerProt.MAP_PROJANIM.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1(dstX - srcX);
        out.p1(dstZ - srcZ);
        out.p2(target); // 0: coord, > 0: npc, < 0: player
        out.p2(spotanim);
        out.p1(srcHeight);
        out.p1(dstHeight);
        out.p2(startDelay);
        out.p2(endDelay);
        out.p1(peak);
        out.p1(arc);

        return out;
    }

    static locAddChange(srcX: number, srcZ: number, id: number, shape: number, angle: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ADD_CHANGE.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1((shape << 2) | (angle & 3));
        out.p2(id);

        return out;
    }

    static locDel(srcX: number, srcZ: number, shape: number, angle: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 1));
        out.p1(ServerProt.LOC_DEL.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1((shape << 2) | (angle & 3));

        return out;
    }

    // merge player with loc, e.g. agility training through pipes
    // useful due to draw prioritizes
    static locMerge(srcX: number, srcZ: number, shape: number, angle: number, locId: number, startCycle: number, endCycle: number, pid: number, east: number, south: number, west: number, north: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 1 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1));
        out.p1(ServerProt.LOC_MERGE.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1((shape << 2) | (angle & 3));
        out.p2(locId);
        out.p2(startCycle);
        out.p2(endCycle);
        out.p2(pid);
        out.p1(east - srcX);
        out.p1(south - srcZ);
        out.p1(west - srcX);
        out.p1(north - srcZ);

        return out;
    }

    static locAnim(srcX: number, srcZ: number, shape: number, angle: number, id: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ANIM.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p1((shape << 2) | (angle & 3));
        out.p2(id);

        return out;
    }

    static objAdd(srcX: number, srcZ: number, id: number, count: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 2 + 2));
        out.p1(ServerProt.OBJ_ADD.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);

        if (count > 65535) {
            count = 65535;
        }
        out.p2(count);

        return out;
    }

    static objCount(srcX: number, srcZ: number, id: number, count: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 2 + 2));
        out.p1(ServerProt.OBJ_COUNT.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);

        if (count > 65535) {
            count = 65535;
        }
        out.p2(count);

        return out;
    }

    static objDel(srcX: number, srcZ: number, id: number, count: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 2));
        out.p1(ServerProt.OBJ_DEL.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);

        return out;
    }

    static objReveal(srcX: number, srcZ: number, id: number, count: number, receiverId: number) {
        const out = new Packet(new Uint8Array(1 + 1 + 2 + 2 + 2));
        out.p1(ServerProt.OBJ_REVEAL.id);

        out.p1(((srcX & 0x7) << 4) | (srcZ & 0x7));
        out.p2(id);
        out.p2(count);
        out.p2(receiverId);

        return out;
    }

    readonly index: number; // packed coord
    readonly x: number = 0;
    readonly z: number = 0;
    readonly level: number = 0;

    // zone entities
    private readonly players: Set<number>; // list of player uids
    private readonly npcs: Set<number>; // list of npc nids (not uid because type may change)
    private readonly locs: (LinkList<Loc> | null)[][];
    private readonly objs: (LinkList<Obj> | null)[][];

    // zone events
    updates: ZoneEvent[] = [];
    lastEvent: number = -1;
    // buffer: Packet2 = new Packet2(new Uint8Array());

    constructor(index: number) {
        this.index = index;
        const { x, z, level } = ZoneManager.unpackIndex(index);
        this.x = x >> 3;
        this.z = z >> 3;
        this.level = level;

        // reset
        this.players = new Set();
        this.npcs = new Set();
        this.objs = new Array(8);
        this.locs = new Array(8);
        for (let x: number = 0; x < 8; x++) {
            this.objs[x] = new Array(8);
            this.locs[x] = new Array(8);
            for (let z: number = 0; z < 8; z++) {
                this.objs[x][z] = null;
                this.locs[x][z] = null;
            }
        }
    }

    enter(entity: PathingEntity): void {
        if (entity instanceof Player) {
            this.players.add(entity.uid);
        } else if (entity instanceof Npc) {
            this.npcs.add(entity.nid);
        }
    }

    leave(entity: PathingEntity): void {
        if (entity instanceof Player) {
            this.players.delete(entity.uid);
        } else if (entity instanceof Npc) {
            this.npcs.delete(entity.nid);
        }
    }

    // ---- not tied to any entities ----

    animMap(x: number, z: number, spotanim: number, height: number, delay: number): void {
        const event: ZoneEvent = new ZoneEvent(ServerProt.MAP_ANIM.id);
        event.buffer = Zone.mapAnim(x, z, spotanim, height, delay);
        event.x = x;
        event.z = z;
        event.tick = World.currentTick;

        this.updates.push(event);
        this.lastEvent = World.currentTick;
    }

    mapProjAnim(x: number, z: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number): void {
        const event: ZoneEvent = new ZoneEvent(ServerProt.MAP_PROJANIM.id);
        event.buffer = Zone.mapProjAnim(x, z, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc);
        event.x = x;
        event.z = z;
        event.tick = World.currentTick;

        this.updates.push(event);
        this.lastEvent = World.currentTick;
    }

    // ---- static locs/objs are added during world init ----

    addStaticLoc(loc: Loc): void {
        const locs: LinkList<Loc> | null = this.locs[loc.x & 0x7][loc.z & 0x7];
        if (!locs) {
            this.locs[loc.x & 0x7][loc.z & 0x7] = new LinkList();
        }
        this.locs[loc.x & 0x7][loc.z & 0x7]?.addTail(loc);
        this.sortLocs(loc.x, loc.z);
    }

    addStaticObj(obj: Obj): void {
        const objs: LinkList<Obj> | null = this.objs[obj.x & 0x7][obj.z & 0x7];
        if (!objs) {
            this.objs[obj.x & 0x7][obj.z & 0x7] = new LinkList();
        }
        this.objs[obj.x & 0x7][obj.z & 0x7]?.addTail(obj);
        this.sortObjs(obj.x, obj.z);

        const event: ZoneEvent = new ZoneEvent(ServerProt.OBJ_ADD.id);
        event.buffer = Zone.objAdd(obj.x, obj.z, obj.type, obj.count);
        event.tick = World.currentTick;
        this.updates.push(event);
        this.lastEvent = World.currentTick;
    }

    // ----

    addLoc(loc: Loc): ZoneEvent {
        if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
            const locs: LinkList<Loc> | null = this.locs[loc.x & 0x7][loc.z & 0x7];
            if (!locs) {
                this.locs[loc.x & 0x7][loc.z & 0x7] = new LinkList();
            }
            this.locs[loc.x & 0x7][loc.z & 0x7]?.addTail(loc);
        }
        this.sortLocs(loc.x, loc.z);

        const event: ZoneEvent = new ZoneEvent(ServerProt.LOC_ADD_CHANGE.id);
        event.buffer = Zone.locAddChange(loc.x, loc.z, loc.type, loc.shape, loc.angle);
        event.x = loc.x;
        event.z = loc.z;
        event.tick = World.currentTick;
        event.layer = rsmod.locShapeLayer(loc.shape);
        event.subjectType = loc.type;

        this.updates = this.updates.filter(event => {
            return !(event.x === loc.x && event.z === loc.z && event.layer === rsmod.locShapeLayer(loc.shape));
        });

        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    removeLoc(loc: Loc): ZoneEvent {
        if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
            const locs: LinkList<Loc> | null = this.locs[loc.x & 0x7][loc.z & 0x7];
            if (locs) {
                for (let next: Loc | null = locs.head() as Loc | null; next; next = locs.next() as Loc | null) {
                    if (next.type === loc.type) {
                        next.unlink();
                        break;
                    }
                }
                if (!locs.head()) {
                    this.locs[loc.x & 0x7][loc.z & 0x7] = null;
                }
            }
        }
        this.sortLocs(loc.x, loc.z);

        const event: ZoneEvent = new ZoneEvent(ServerProt.LOC_DEL.id);
        event.buffer = Zone.locDel(loc.x, loc.z, loc.shape, loc.angle);
        event.x = loc.x;
        event.z = loc.z;
        event.tick = World.currentTick;
        event.layer = rsmod.locShapeLayer(loc.shape);
        event.subjectType = loc.type;

        this.updates = this.updates.filter(event => {
            return !(event.x === loc.x && event.z === loc.z && event.layer === rsmod.locShapeLayer(loc.shape));
        });

        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    getLoc(x: number, z: number, type: number): Loc | null {
        const locs: LinkList<Loc> | null = this.locs[x & 0x7][z & 0x7];
        if (!locs) {
            return null;
        }
        for (let loc: Loc | null = locs.head() as Loc | null; loc; loc = locs.next() as Loc | null) {
            if (loc.type === type && loc.checkLifeCycle(World.currentTick)) {
                return loc;
            }
        }
        return null;
    }

    mergeLoc(loc: Loc, player: Player, startCycle: number, endCycle: number, south: number, east: number, north: number, west: number): void {
        const event: ZoneEvent = new ZoneEvent(ServerProt.LOC_MERGE.id);
        event.buffer = Zone.locMerge(loc.x, loc.z, loc.shape, loc.angle, loc.type, startCycle, endCycle, player.pid, east, south, west, north);
        event.x = loc.x;
        event.z = loc.z;
        event.tick = World.currentTick;
        event.layer = rsmod.locShapeLayer(loc.shape);
        event.subjectType = loc.type;

        this.updates.push(event);
        this.lastEvent = World.currentTick;
    }

    animLoc(loc: Loc, seq: number) {
        const event: ZoneEvent = new ZoneEvent(ServerProt.LOC_ANIM.id);
        event.buffer = Zone.locAnim(loc.x, loc.z, loc.shape, loc.angle, seq);
        event.x = loc.x;
        event.z = loc.z;
        event.tick = World.currentTick;
        event.layer = rsmod.locShapeLayer(loc.shape);
        event.subjectType = loc.type;

        this.updates.push(event);
        this.lastEvent = World.currentTick;
    }

    // ----

    addObj(obj: Obj, receiver: Player | null): ZoneEvent {
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            const objs: LinkList<Obj> | null = this.objs[obj.x & 0x7][obj.z & 0x7];
            if (!objs) {
                this.objs[obj.x & 0x7][obj.z & 0x7] = new LinkList();
            }
            this.objs[obj.x & 0x7][obj.z & 0x7]?.addTail(obj);
        }
        this.sortObjs(obj.x, obj.z);

        const event = new ZoneEvent(ServerProt.OBJ_ADD.id);
        if (receiver) {
            event.receiverId = receiver.uid;
        }
        event.buffer = Zone.objAdd(obj.x, obj.z, obj.type, obj.count);
        event.x = obj.x;
        event.z = obj.z;
        event.tick = World.currentTick;
        event.subjectType = obj.type;

        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    removeObj(obj: Obj, receiver: Player | null): ZoneEvent {
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            const objs: LinkList<Obj> | null = this.objs[obj.x & 0x7][obj.z & 0x7];
            if (objs) {
                for (let next: Obj | null = objs.head() as Obj | null; next; next = objs.next() as Obj | null) {
                    if (next.type === obj.type) {
                        next.unlink();
                        break;
                    }
                }
                if (!objs.head()) {
                    this.objs[obj.x & 0x7][obj.z & 0x7] = null;
                }
            }
        }
        this.sortObjs(obj.x, obj.z);

        const event: ZoneEvent = new ZoneEvent(ServerProt.OBJ_DEL.id);
        event.buffer = Zone.objDel(obj.x, obj.z, obj.type, obj.count);
        if (receiver) {
            event.receiverId = receiver.uid;
        }
        event.x = obj.x;
        event.z = obj.z;
        event.tick = World.currentTick;
        event.subjectType = obj.type;

        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    getObj(x: number, z: number, type: number): Obj | null {
        const objs: LinkList<Obj> | null = this.objs[x & 0x7][z & 0x7];
        if (!objs) {
            return null;
        }
        for (let obj: Obj | null = objs.head() as Obj | null; obj; obj = objs.next() as Obj | null) {
            if (obj.type === type && obj.checkLifeCycle(World.currentTick)) {
                return obj;
            }
        }
        return null;
    }

    *getPlayers(): IterableIterator<Player> {
        for (const uid of this.players) {
            const player: Player | null = World.getPlayerByUid(uid);
            if (!player) {
                continue;
            }
            if (!player.checkLifeCycle(World.currentTick)) {
                continue;
            }
            yield player;
        }
    }

    *getNpcs(): IterableIterator<Npc> {
        for (const nid of this.npcs) {
            const npc: Npc | null = World.getNpc(nid);
            if (!npc) {
                continue;
            }
            if (!npc.checkLifeCycle(World.currentTick)) {
                continue;
            }
            yield npc;
        }
    }

    *getObjs(): IterableIterator<Obj> {
        for (let x: number = 0; x < 8; x++) {
            for (let z: number = 0; z < 8; z++) {
                const objs: LinkList<Obj> | null = this.objs[x & 0x7][z & 0x7];
                if (!objs) {
                    continue;
                }
                for (let obj: Obj | null = objs.head() as Obj | null; obj; obj = objs.next() as Obj | null) {
                    if (!obj.checkLifeCycle(World.currentTick)) {
                        continue;
                    }
                    yield obj;
                }
            }
        }
    }

    *getObjsUnsafe(): IterableIterator<Obj> {
        for (let x: number = 0; x < 8; x++) {
            for (let z: number = 0; z < 8; z++) {
                const objs: LinkList<Obj> | null = this.objs[x & 0x7][z & 0x7];
                if (!objs) {
                    continue;
                }
                for (let obj: Obj | null = objs.head() as Obj | null; obj; obj = objs.next() as Obj | null) {
                    yield obj;
                }
            }
        }
    }

    *getLocs(): IterableIterator<Loc> {
        for (let x: number = 0; x < 8; x++) {
            for (let z: number = 0; z < 8; z++) {
                const locs: LinkList<Loc> | null = this.locs[x & 0x7][z & 0x7];
                if (!locs) {
                    continue;
                }
                for (let loc: Loc | null = locs.head() as Loc | null; loc; loc = locs.next() as Loc | null) {
                    if (!loc.checkLifeCycle(World.currentTick)) {
                        continue;
                    }
                    yield loc;
                }
            }
        }
    }

    *getLocsUnsafe(): IterableIterator<Loc> {
        for (let x: number = 0; x < 8; x++) {
            for (let z: number = 0; z < 8; z++) {
                const locs: LinkList<Loc> | null = this.locs[x & 0x7][z & 0x7];
                if (!locs) {
                    continue;
                }
                for (let loc: Loc | null = locs.head() as Loc | null; loc; loc = locs.next() as Loc | null) {
                    yield loc;
                }
            }
        }
    }

    private sortObjs(x: number, z: number): void {
        const objs: LinkList<Obj> | null = this.objs[x & 0x7][z & 0x7];
        if (!objs) {
            return;
        }

        let topCost: number = -99999999;
        let topObj: Obj | null = null;

        for (let obj: Obj | null = objs.head() as Obj | null; obj; obj = objs.next() as Obj | null) {
            const type: ObjType = ObjType.get(obj.type);
            let cost: number = type.cost;

            if (type.stackable) {
                cost *= obj.count + 1;
            }

            if (cost > topCost) {
                topCost = cost;
                topObj = obj;
            }
        }

        if (!topObj) {
            return;
        }
        objs.addHead(topObj);
    }

    private sortLocs(x: number, z: number): void {
        const locs: LinkList<Loc> | null = this.locs[x & 0x7][z & 0x7];
        if (!locs) {
            return;
        }

        let topCost: number = -99999999;
        let topLoc: Loc | null = null;

        for (let loc: Loc | null = locs.head() as Loc | null; loc; loc = locs.next() as Loc | null) {
            const cost: number = loc.lifecycleTick + loc.lifecycle;
            if (cost > topCost) {
                topCost = cost;
                topLoc = loc;
            }
        }

        if (!topLoc) {
            return;
        }
        locs.addHead(topLoc);
    }
}
