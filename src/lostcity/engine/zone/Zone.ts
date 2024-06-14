import ObjType from '#lostcity/cache/config/ObjType.js';

import Packet from '#jagex2/io/Packet.js';

import Loc from '#lostcity/entity/Loc.js';
import Npc from '#lostcity/entity/Npc.js';
import Obj from '#lostcity/entity/Obj.js';
import Player from '#lostcity/entity/Player.js';
import PathingEntity from '#lostcity/entity/PathingEntity.js';
import EntityLifeCycle from '#lostcity/entity/EntityLifeCycle.js';
import {Position} from '#lostcity/entity/Position.js';

import ServerProt from '#lostcity/server/ServerProt.js';

import World from '#lostcity/engine/World.js';
import ZoneManager from '#lostcity/engine/zone/ZoneManager.js';
import ZoneEvent from '#lostcity/engine/zone/ZoneEvent.js';

import * as rsmod from '@2004scape/rsmod-pathfinder';

export default class Zone {
    static mapAnim(coord: number, spotanim: number, height: number, delay: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 1 + 2));
        out.p1(ServerProt.MAP_ANIM.id);
        out.p1(coord);
        out.p2(spotanim);
        out.p1(height);
        out.p2(delay);
        return out.data;
    }

    // variables fully broken out for now
    //coord $from, coord $to, spotanim $spotanim, int $fromHeight, int $toHeight, int $startDelay, int $endDelay, int $peak, int $arc
    static mapProjAnim(srcX: number, srcZ: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 1 + 2 + 2 + 1 + 1 + 2 + 2 + 1 + 1));
        out.p1(ServerProt.MAP_PROJANIM.id);
        out.p1(Position.packZoneCoord(srcX, srcZ));
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
        return out.data;
    }

    static locAddChange(coord: number, loc: number, shape: number, angle: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ADD_CHANGE.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        out.p2(loc);
        return out.data;
    }

    static locDel(coord: number, shape: number, angle: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1));
        out.p1(ServerProt.LOC_DEL.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        return out.data;
    }

    // merge player with loc, e.g. agility training through pipes
    // useful due to draw prioritizes
    static locMerge(srcX: number, srcZ: number, shape: number, angle: number, locId: number, startCycle: number, endCycle: number, pid: number, east: number, south: number, west: number, north: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1));
        out.p1(ServerProt.LOC_MERGE.id);
        out.p1(Position.packZoneCoord(srcX, srcZ));
        out.p1((shape << 2) | (angle & 3));
        out.p2(locId);
        out.p2(startCycle);
        out.p2(endCycle);
        out.p2(pid);
        out.p1(east - srcX);
        out.p1(south - srcZ);
        out.p1(west - srcX);
        out.p1(north - srcZ);
        return out.data;
    }

    static locAnim(coord: number, shape: number, angle: number, id: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ANIM.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        out.p2(id);
        return out.data;
    }

    static objAdd(coord: number, obj: number, count: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2));
        out.p1(ServerProt.OBJ_ADD.id);
        out.p1(coord);
        out.p2(obj);
        out.p2(Math.min(count, 65535));
        return out.data;
    }

    static objCount(coord: number, id: number, oldCount: number, newCount: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2 + 2));
        out.p1(ServerProt.OBJ_COUNT.id);
        out.p1(coord);
        out.p2(id);
        out.p2(Math.min(oldCount, 65535));
        out.p2(Math.min(newCount, 65535));
        return out.data;
    }

    static objDel(coord: number, obj: number): Uint8Array {
        const out = new Packet(new Uint8Array(1 + 1 + 2));
        out.p1(ServerProt.OBJ_DEL.id);
        out.p1(coord);
        out.p2(obj);
        return out.data;
    }

    static objReveal(coord: number, id: number, count: number, receiverId: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2 + 2));
        out.p1(ServerProt.OBJ_REVEAL.id);
        out.p1(coord);
        out.p2(id);
        out.p2(count);
        out.p2(receiverId);
        return out.data;
    }

    readonly index: number; // packed coord
    readonly x: number = 0;
    readonly z: number = 0;
    readonly level: number = 0;

    // zone entities
    private readonly players: Set<number>; // list of player uids
    private readonly npcs: Set<number>; // list of npc nids (not uid because type may change)
    private readonly locs: (Loc[] | null)[];
    private readonly objs: (Obj[] | null)[];

    // zone events
    readonly enclosed: Set<ZoneEvent>;
    readonly follows: Set<ZoneEvent>;
    shared: Uint8Array | null = null;

    constructor(index: number) {
        this.index = index;
        const coord: Position = ZoneManager.unpackIndex(index);
        this.x = coord.x >> 3;
        this.z = coord.z >> 3;
        this.level = coord.level;
        this.players = new Set();
        this.npcs = new Set();
        this.objs = [];
        this.locs = [];
        this.enclosed = new Set();
        this.follows = new Set();
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

    tick(tick: number): void {
        let emitted: boolean;
        do {
            emitted = false;
            for (const obj of this.getObjsUnsafe()) {
                if (!obj.updateLifeCycle(tick) || obj.lastLifecycleTick === tick) {
                    continue;
                }
                if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
                    if (obj.receiverId !== -1) {
                        World.revealObj(obj);
                    } else {
                        World.removeObj(obj, 0);
                        emitted = true;
                    }
                } else if (obj.lifecycle === EntityLifeCycle.RESPAWN) {
                    World.addObj(obj, -1, 0);
                    emitted = true;
                }
            }
            for (const loc of this.getLocsUnsafe()) {
                if (!loc.updateLifeCycle(tick) || loc.lastLifecycleTick === tick) {
                    continue;
                }
                if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
                    World.removeLoc(loc, 0);
                    emitted = true;
                } else if (loc.lifecycle === EntityLifeCycle.RESPAWN) {
                    World.addLoc(loc, 0);
                    emitted = true;
                }
            }
        } while (emitted);
    }

    global(): void {
        const enclosed: Uint8Array[] = Array.from(this.enclosed.values()).map(x => x.buffer);
        const length: number = enclosed.reduce((acc, curr) => acc + curr.length, 0);
        if (length > 0) {
            const shared: Uint8Array = new Uint8Array(length);
            let ptr: number = 0;
            for (const bytes of enclosed) {
                shared.set(bytes, ptr);
                ptr += bytes.length;
            }
            this.shared = shared;
        }
    }

    reset(): void {
        this.enclosed.clear();
        this.follows.clear();
    }

    // ---- static locs/objs are added during world init ----

    addStaticLoc(loc: Loc): void {
        const coord: number = Position.packZoneCoord(loc.x, loc.z);
        const locs: Loc[] | null = this.locs[coord];
        if (!locs) {
            this.locs[coord] = [];
        }
        this.locs[coord]?.push(loc);
        this.sortLocs(coord);
    }

    addStaticObj(obj: Obj): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        const objs: Obj[] | null = this.objs[coord];
        if (!objs) {
            this.objs[coord] = [];
        }
        this.objs[coord]?.push(obj);
        this.sortObjs(coord);
    }

    // ----

    addLoc(loc: Loc): void {
        const coord: number = Position.packZoneCoord(loc.x, loc.z);
        if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
            const locs: Loc[] | null = this.locs[coord];
            if (!locs) {
                this.locs[coord] = [];
            }
            this.locs[coord]?.unshift(loc);
        }
        this.sortLocs(coord);

        this.enclosed.add({
            prot: ServerProt.LOC_ADD_CHANGE,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            type: loc.type,
            receiverId: -1,
            buffer: Zone.locAddChange(coord, loc.type, loc.shape, loc.angle)
        });
    }

    removeLoc(loc: Loc): void {
        const coord: number = Position.packZoneCoord(loc.x, loc.z);
        if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
            const locs: Loc[] | null = this.locs[coord];
            if (locs) {
                for (let index: number = 0; index < locs.length; index++) {
                    if (loc === locs[index]) {
                        locs.splice(index, 1);
                        break;
                    }
                }
            }
        }
        this.sortLocs(coord);

        this.enclosed.add({
            prot: ServerProt.LOC_DEL,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            type: loc.type,
            receiverId: -1,
            buffer: Zone.locDel(coord, loc.shape, loc.angle)
        });
    }

    getLoc(x: number, z: number, type: number): Loc | null {
        const coord: number = Position.packZoneCoord(x, z);
        const locs: Loc[] | null = this.locs[coord];
        if (!locs) {
            return null;
        }
        for (const loc of locs) {
            if (loc.type === type && loc.checkLifeCycle(World.currentTick)) {
                return loc;
            }
        }
        return null;
    }

    mergeLoc(loc: Loc, player: Player, startCycle: number, endCycle: number, south: number, east: number, north: number, west: number): void {
        this.enclosed.add({
            prot: ServerProt.LOC_MERGE,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            type: loc.type,
            receiverId: -1,
            buffer: Zone.locMerge(loc.x, loc.z, loc.shape, loc.angle, loc.type, startCycle, endCycle, player.pid, east, south, west, north)
        });
    }

    animLoc(loc: Loc, seq: number): void {
        this.enclosed.add({
            prot: ServerProt.LOC_ANIM,
            x: loc.x,
            z: loc.z,
            layer: rsmod.locShapeLayer(loc.shape),
            type: loc.type,
            receiverId: -1,
            buffer: Zone.locAnim(Position.packZoneCoord(loc.x, loc.z), loc.shape, loc.angle, seq)
        });
    }

    // ----

    addObj(obj: Obj, receiverId: number): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            const objs: Obj[] | null = this.objs[coord];
            if (!objs) {
                this.objs[coord] = [];
            }
            this.objs[coord]?.push(obj);
        }
        this.sortObjs(coord);

        const event: ZoneEvent = {
            prot: ServerProt.OBJ_ADD,
            x: obj.x,
            z: obj.z,
            layer: -1,
            type: obj.type,
            receiverId: receiverId,
            buffer: Zone.objAdd(coord, obj.type, obj.count)
        };
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            this.follows.add(event);
        } else if (obj.lifecycle === EntityLifeCycle.RESPAWN) {
            this.enclosed.add(event);
        }
    }

    revealObj(obj: Obj, receiverId: number): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        obj.receiverId = -1;
        obj.reveal = -1;
        this.sortObjs(coord);

        this.enclosed.add({
            prot: ServerProt.OBJ_REVEAL,
            x: obj.x,
            z: obj.z,
            layer: -1,
            type: obj.type,
            receiverId: -1,
            buffer: Zone.objReveal(coord, obj.type, obj.count, receiverId)
        });
    }

    changeObj(obj: Obj, receiverId: number, oldCount: number, newCount: number): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        obj.count = newCount;
        this.sortObjs(coord);

        this.follows.add({
            prot: ServerProt.OBJ_COUNT,
            x: obj.x,
            z: obj.z,
            layer: -1,
            type: obj.type,
            receiverId: receiverId,
            buffer: Zone.objCount(coord, obj.type, oldCount, newCount)
        });
    }

    removeObj(obj: Obj): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            const objs: Obj[] | null = this.objs[coord];
            if (objs) {
                for (let index: number = 0; index < objs.length; index++) {
                    if (obj === objs[index]) {
                        objs.splice(index, 1);
                        break;
                    }
                }
            }
        }
        this.sortObjs(coord);

        const event: ZoneEvent = {
            prot: ServerProt.OBJ_DEL,
            x: obj.x,
            z: obj.z,
            layer: -1,
            type: obj.type,
            receiverId: -1,
            buffer: Zone.objDel(coord, obj.type)
        };
        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            this.follows.add(event);
        } else if (obj.lifecycle === EntityLifeCycle.RESPAWN) {
            this.enclosed.add(event);
        }
    }

    // ---- not tied to any entities ----

    animMap(x: number, z: number, spotanim: number, height: number, delay: number): void {
        this.enclosed.add({
            prot: ServerProt.MAP_ANIM,
            x: x,
            z: z,
            layer: -1,
            receiverId: -1,
            type: -1,
            buffer: Zone.mapAnim(Position.packZoneCoord(x, z), spotanim, height, delay)
        });
    }

    mapProjAnim(x: number, z: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number): void {
        this.enclosed.add({
            prot: ServerProt.MAP_PROJANIM,
            x: x,
            z: z,
            layer: -1,
            receiverId: -1,
            type: -1,
            buffer: Zone.mapProjAnim(x, z, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc)
        });
    }

    getObj(x: number, z: number, type: number): Obj | null {
        const coord: number = Position.packZoneCoord(x, z);
        const objs: Obj[] | null = this.objs[coord];
        if (!objs) {
            return null;
        }
        for (const obj of objs) {
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
            const objs: Obj[] | null = this.objs[index];
            if (!objs) {
                continue;
            }
            for (const obj of objs) {
                if (!obj.checkLifeCycle(World.currentTick)) {
                    continue;
                }
                yield obj;
            }
        }
    }

    *getObjsUnsafe(): IterableIterator<Obj> {
        for (let index: number = 0; index < this.objs.length; index++) {
            const objs: Obj[] | null = this.objs[index];
            if (!objs) {
                continue;
            }
            for (const obj of objs) {
                yield obj;
            }
        }
    }

    *getLocs(): IterableIterator<Loc> {
        for (let index: number = 0; index < this.locs.length; index++) {
            const locs: Loc[] | null = this.locs[index];
            if (!locs) {
                continue;
            }
            for (const loc of locs) {
                if (!loc.checkLifeCycle(World.currentTick)) {
                    continue;
                }
                yield loc;
            }
        }
    }

    *getLocsUnsafe(): IterableIterator<Loc> {
        for (let index: number = 0; index < this.locs.length; index++) {
            const locs: Loc[] | null = this.locs[index];
            if (!locs) {
                continue;
            }
            for (const loc of locs) {
                yield loc;
            }
        }
    }

    private sortObjs(coord: number): void {
        const objs: Obj[] | null = this.objs[coord];
        if (!objs) {
            return;
        }

        let topCost: number = -99999999;
        let topObj: Obj | null = null;

        for (const obj of objs) {
            const type: ObjType = ObjType.get(obj.type);
            let cost: number = type.cost;

            if (type.stackable) {
                cost *= obj.count + 1;
            }

            cost += obj.lifecycle;

            if (cost > topCost) {
                topCost = cost;
                topObj = obj;
            }
        }

        if (!topObj) {
            return;
        }

        if (objs[0] !== topObj) {
            objs.splice(objs.indexOf(topObj), 1);
            objs.unshift(topObj);
        }
    }

    private sortLocs(coord: number): void {
        const locs: Loc[] | null = this.locs[coord];
        if (!locs) {
            return;
        }

        let topCost: number = -99999999;
        let topLoc: Loc | null = null;

        for (const loc of locs) {
            const cost: number = loc.lifecycle;
            if (cost > topCost) {
                topCost = cost;
                topLoc = loc;
            }
        }

        if (!topLoc) {
            return;
        }

        if (locs[0] !== topLoc) {
            locs.splice(locs.indexOf(topLoc), 1);
            locs.unshift(topLoc);
        }
    }
}
