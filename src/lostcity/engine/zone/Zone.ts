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
import {Position, ZonePosition} from '#lostcity/entity/Position.js';
import {ZoneEvent} from '#lostcity/engine/zone/ZoneEvent.js';

export default class Zone {
    static mapAnim(coord: number, id: number, height: number, delay: number): Packet {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 1 + 2));
        out.p1(ServerProt.MAP_ANIM.id);
        out.p1(coord);
        out.p2(id);
        out.p1(height);
        out.p2(delay);
        return out;
    }

    // variables fully broken out for now
    //coord $from, coord $to, spotanim $spotanim, int $fromHeight, int $toHeight, int $startDelay, int $endDelay, int $peak, int $arc
    static mapProjAnim(coord: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number): Packet {
        const unpack: ZonePosition = Position.unpackZoneCoord(coord);

        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 1 + 2 + 2 + 1 + 1 + 2 + 2 + 1 + 1));
        out.p1(ServerProt.MAP_PROJANIM.id);
        out.p1(coord);
        out.p1(dstX - unpack.x);
        out.p1(dstZ - unpack.z);
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

    static locAddChange(coord: number, id: number, shape: number, angle: number): Packet {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ADD_CHANGE.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        out.p2(id);
        return out;
    }

    static locDel(coord: number, shape: number, angle: number): Packet {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1));
        out.p1(ServerProt.LOC_DEL.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        return out;
    }

    // merge player with loc, e.g. agility training through pipes
    // useful due to draw prioritizes
    static locMerge(coord: number, shape: number, angle: number, locId: number, startCycle: number, endCycle: number, pid: number, east: number, south: number, west: number, north: number): Packet {
        const unpack: ZonePosition = Position.unpackZoneCoord(coord);

        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1));
        out.p1(ServerProt.LOC_MERGE.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        out.p2(locId);
        out.p2(startCycle);
        out.p2(endCycle);
        out.p2(pid);
        out.p1(east - unpack.x);
        out.p1(south - unpack.z);
        out.p1(west - unpack.x);
        out.p1(north - unpack.z);
        return out;
    }

    static locAnim(coord: number, shape: number, angle: number, id: number): Packet {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ANIM.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        out.p2(id);
        return out;
    }

    static objAdd(coord: number, id: number, count: number): Packet {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2));
        out.p1(ServerProt.OBJ_ADD.id);
        out.p1(coord);
        out.p2(id);
        if (count > 65535) {
            count = 65535;
        }
        out.p2(count);
        return out;
    }

    static objCount(coord: number, id: number, oldCount: number, newCount: number): Packet {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2 + 2));
        out.p1(ServerProt.OBJ_COUNT.id);
        out.p1(coord);
        out.p2(id);
        out.p2(Math.min(oldCount, 65535));
        out.p2(Math.min(newCount, 65535));
        return out;
    }

    static objDel(coord: number, id: number): Packet {
        const out = new Packet(new Uint8Array(1 + 1 + 2));
        out.p1(ServerProt.OBJ_DEL.id);
        out.p1(coord);
        out.p2(id);
        return out;
    }

    static objReveal(coord: number, id: number, count: number, receiverId: number): Packet {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2 + 2));
        out.p1(ServerProt.OBJ_REVEAL.id);
        out.p1(coord);
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
    private readonly locs: (LinkList<Loc> | null)[];
    private readonly objs: (LinkList<Obj> | null)[];

    // zone events
    updates: ZoneEvent[] = [];
    lastEvent: number = -1;

    constructor(index: number) {
        this.index = index;
        const coord: Position = ZoneManager.unpackIndex(index);
        this.x = coord.x >> 3;
        this.z = coord.z >> 3;
        this.level = coord.level;
        this.players = new Set();
        this.npcs = new Set();
        this.objs = new Array(8 * 8).fill(null);
        this.locs = new Array(8 * 8).fill(null);
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
        this.updates.push({
            prot: ServerProt.MAP_ANIM,
            tick: World.currentTick,
            x: x,
            z: z,
            buffer: Zone.mapAnim(Position.packZoneCoord(x, z), spotanim, height, delay)
        });
        this.lastEvent = World.currentTick;
    }

    mapProjAnim(x: number, z: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number): void {
        this.updates.push({
            prot: ServerProt.MAP_PROJANIM,
            tick: World.currentTick,
            x: x,
            z: z,
            buffer: Zone.mapProjAnim(Position.packZoneCoord(x, z), dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc)
        });
        this.lastEvent = World.currentTick;
    }

    // ---- static locs/objs are added during world init ----

    addStaticLoc(loc: Loc): void {
        const coord: number = Position.packZoneCoord(loc.x, loc.z);
        const locs: LinkList<Loc> | null = this.locs[coord];
        if (!locs) {
            this.locs[coord] = new LinkList();
        }
        this.locs[coord]?.addTail(loc);
        this.sortLocs(coord);
    }

    addStaticObj(obj: Obj): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        const objs: LinkList<Obj> | null = this.objs[coord];
        if (!objs) {
            this.objs[coord] = new LinkList();
        }
        this.objs[coord]?.addTail(obj);
        this.sortObjs(coord);

        this.updates.push({
            prot: ServerProt.OBJ_ADD,
            tick: World.currentTick,
            x: obj.x,
            z: obj.z,
            buffer: Zone.objAdd(coord, obj.type, obj.count)
        });
        this.lastEvent = World.currentTick;
    }

    // ----

    addLoc(loc: Loc): ZoneEvent {
        const coord: number = Position.packZoneCoord(loc.x, loc.z);
        if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
            const locs: LinkList<Loc> | null = this.locs[coord];
            if (!locs) {
                this.locs[coord] = new LinkList();
            }
            this.locs[coord]?.addTail(loc);
        }
        this.sortLocs(coord);

        this.updates = this.updates.filter(event => {
            return !(event.x === loc.x && event.z === loc.z && event.layer === rsmod.locShapeLayer(loc.shape));
        });

        const event: ZoneEvent = {
            prot: ServerProt.LOC_ADD_CHANGE,
            tick: World.currentTick,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            subjectType: loc.type,
            buffer: Zone.locAddChange(coord, loc.type, loc.shape, loc.angle)
        };
        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    removeLoc(loc: Loc): ZoneEvent {
        const coord: number = Position.packZoneCoord(loc.x, loc.z);
        if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
            const locs: LinkList<Loc> | null = this.locs[coord];
            if (locs) {
                for (let next: Loc | null = locs.head() as Loc | null; next; next = locs.next() as Loc | null) {
                    if (next.type === loc.type) {
                        next.unlink();
                        break;
                    }
                }
                if (!locs.head()) {
                    this.locs[coord] = null;
                }
            }
        }
        this.sortLocs(coord);

        this.updates = this.updates.filter(event => {
            return !(event.x === loc.x && event.z === loc.z && event.layer === rsmod.locShapeLayer(loc.shape));
        });

        const event: ZoneEvent = {
            prot: ServerProt.LOC_DEL,
            tick: World.currentTick,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            subjectType: loc.type,
            buffer: Zone.locDel(coord, loc.shape, loc.angle)
        };
        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    getLoc(x: number, z: number, type: number): Loc | null {
        const coord: number = Position.packZoneCoord(x, z);
        const locs: LinkList<Loc> | null = this.locs[coord];
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
        this.updates.push({
            prot: ServerProt.LOC_MERGE,
            tick: World.currentTick,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            subjectType: loc.type,
            buffer: Zone.locMerge(Position.packZoneCoord(loc.x, loc.z), loc.shape, loc.angle, loc.type, startCycle, endCycle, player.pid, east, south, west, north)
        });
        this.lastEvent = World.currentTick;
    }

    animLoc(loc: Loc, seq: number): void {
        this.updates.push({
            prot: ServerProt.LOC_ANIM,
            tick: World.currentTick,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            subjectType: loc.type,
            buffer: Zone.locAnim(Position.packZoneCoord(loc.x, loc.z), loc.shape, loc.angle, seq)
        });
        this.lastEvent = World.currentTick;
    }

    // ----

    addObj(obj: Obj, receiver: Player | null): ZoneEvent {
        console.log('addObj');
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            const objs: LinkList<Obj> | null = this.objs[coord];
            if (!objs) {
                this.objs[coord] = new LinkList();
            }
            this.objs[coord]?.addTail(obj);
        }
        this.sortObjs(coord);

        const event: ZoneEvent = {
            prot: ServerProt.OBJ_ADD,
            tick: World.currentTick,
            x: obj.x,
            z: obj.z,
            subjectType: obj.type,
            receiverId: receiver?.uid,
            buffer: Zone.objAdd(coord, obj.type, obj.count)
        };
        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    changeObj(obj: Obj, receiver: Player | null, oldCount: number, newCount: number): ZoneEvent {
        console.log('changeObj');
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        obj.count = newCount;
        this.sortObjs(coord);

        const event: ZoneEvent = {
            prot: ServerProt.OBJ_COUNT,
            tick: World.currentTick,
            x: obj.x,
            z: obj.z,
            subjectType: obj.type,
            receiverId: receiver?.uid,
            buffer: Zone.objCount(coord, obj.type, oldCount, newCount)
        };
        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    removeObj(obj: Obj, receiver: Player | null): ZoneEvent {
        console.log('removeObj');
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            const objs: LinkList<Obj> | null = this.objs[coord];
            if (objs) {
                for (let next: Obj | null = objs.head() as Obj | null; next; next = objs.next() as Obj | null) {
                    if (next.type === obj.type) {
                        next.unlink();
                        break;
                    }
                }
                if (!objs.head()) {
                    this.objs[coord] = null;
                }
            }
        }
        this.sortObjs(coord);

        const event: ZoneEvent = {
            prot: ServerProt.OBJ_DEL,
            tick: World.currentTick,
            x: obj.x,
            z: obj.z,
            subjectType: obj.type,
            receiverId: receiver?.uid,
            buffer: Zone.objDel(coord, obj.type)
        };
        this.updates.push(event);
        this.lastEvent = World.currentTick;
        return event;
    }

    getObj(x: number, z: number, type: number): Obj | null {
        const coord: number = Position.packZoneCoord(x, z);
        const objs: LinkList<Obj> | null = this.objs[coord];
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
        for (let index: number = 0; index < this.objs.length; index++) {
            const objs: LinkList<Obj> | null = this.objs[index];
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

    *getObjsUnsafe(): IterableIterator<Obj> {
        for (let index: number = 0; index < this.objs.length; index++) {
            const objs: LinkList<Obj> | null = this.objs[index];
            if (!objs) {
                continue;
            }
            for (let obj: Obj | null = objs.head() as Obj | null; obj; obj = objs.next() as Obj | null) {
                yield obj;
            }
        }
    }

    *getLocs(): IterableIterator<Loc> {
        for (let index: number = 0; index < this.locs.length; index++) {
            const locs: LinkList<Loc> | null = this.locs[index];
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

    *getLocsUnsafe(): IterableIterator<Loc> {
        for (let index: number = 0; index < this.locs.length; index++) {
            const locs: LinkList<Loc> | null = this.locs[index];
            if (!locs) {
                continue;
            }
            for (let loc: Loc | null = locs.head() as Loc | null; loc; loc = locs.next() as Loc | null) {
                yield loc;
            }
        }
    }

    private sortObjs(coord: number): void {
        const objs: LinkList<Obj> | null = this.objs[coord];
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

    private sortLocs(coord: number): void {
        const locs: LinkList<Loc> | null = this.locs[coord];
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
