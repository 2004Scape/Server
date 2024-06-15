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
import ZoneEventType from '#lostcity/engine/zone/ZoneEventType.js';

export default class Zone {
    private static mapAnim(coord: number, spotanim: number, height: number, delay: number): Uint8Array {
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
    private static mapProjAnim(srcX: number, srcZ: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number): Uint8Array {
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

    private static locAddChange(coord: number, loc: number, shape: number, angle: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ADD_CHANGE.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        out.p2(loc);
        return out.data;
    }

    private static locDel(coord: number, shape: number, angle: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1));
        out.p1(ServerProt.LOC_DEL.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        return out.data;
    }

    // merge player with loc, e.g. agility training through pipes
    // useful due to draw prioritizes
    private static locMerge(srcX: number, srcZ: number, shape: number, angle: number, locId: number, startCycle: number, endCycle: number, pid: number, east: number, south: number, west: number, north: number): Uint8Array {
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

    private static locAnim(coord: number, shape: number, angle: number, id: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 1 + 2));
        out.p1(ServerProt.LOC_ANIM.id);
        out.p1(coord);
        out.p1((shape << 2) | (angle & 3));
        out.p2(id);
        return out.data;
    }

    private static objAdd(coord: number, obj: number, count: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2));
        out.p1(ServerProt.OBJ_ADD.id);
        out.p1(coord);
        out.p2(obj);
        out.p2(Math.min(count, 65535));
        return out.data;
    }

    private static objCount(coord: number, id: number, oldCount: number, newCount: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2 + 2));
        out.p1(ServerProt.OBJ_COUNT.id);
        out.p1(coord);
        out.p2(id);
        out.p2(Math.min(oldCount, 65535));
        out.p2(Math.min(newCount, 65535));
        return out.data;
    }

    private static objDel(coord: number, obj: number): Uint8Array {
        const out = new Packet(new Uint8Array(1 + 1 + 2));
        out.p1(ServerProt.OBJ_DEL.id);
        out.p1(coord);
        out.p2(obj);
        return out.data;
    }

    private static objReveal(coord: number, id: number, count: number, receiverId: number): Uint8Array {
        const out: Packet = new Packet(new Uint8Array(1 + 1 + 2 + 2 + 2));
        out.p1(ServerProt.OBJ_REVEAL.id);
        out.p1(coord);
        out.p2(id);
        out.p2(count);
        out.p2(receiverId);
        return out.data;
    }

    readonly index: number; // packed coord
    readonly x: number;
    readonly z: number;
    readonly level: number;

    // zone entities
    private readonly players: Set<number> = new Set(); // list of player uids
    private readonly npcs: Set<number> = new Set(); // list of npc nids (not uid because type may change)
    private readonly locs: (Loc[] | null)[] = [];
    private readonly objs: (Obj[] | null)[] = [];

    // zone events
    private readonly events: Set<ZoneEvent> = new Set();
    private shared: Uint8Array | null = null;

    constructor(index: number) {
        this.index = index;
        const coord: Position = ZoneManager.unpackIndex(index);
        this.x = coord.x >> 3;
        this.z = coord.z >> 3;
        this.level = coord.level;
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
        let updated: boolean;
        do {
            updated = false;
            for (const obj of this.getAllObjsUnsafe()) {
                if (!obj.updateLifeCycle(tick) || obj.lastLifecycleTick === tick) {
                    continue;
                }
                if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
                    if (obj.receiverId !== -1) {
                        World.revealObj(obj);
                    } else {
                        World.removeObj(obj, 0);
                        updated = true;
                    }
                } else if (obj.lifecycle === EntityLifeCycle.RESPAWN) {
                    World.addObj(obj, -1, 0);
                    updated = true;
                }
            }
            for (const loc of this.getAllLocsUnsafe()) {
                if (!loc.updateLifeCycle(tick) || loc.lastLifecycleTick === tick) {
                    continue;
                }
                if (loc.lifecycle === EntityLifeCycle.DESPAWN) {
                    World.removeLoc(loc, 0);
                    updated = true;
                } else if (loc.lifecycle === EntityLifeCycle.RESPAWN) {
                    World.addLoc(loc, 0);
                    updated = true;
                }
            }
        } while (updated);
    }

    computeShared(): void {
        this.shared = null;
        const enclosed: Uint8Array[] = Array.from(this.events.values()).filter(x => x.type === ZoneEventType.ENCLOSED).map(x => x.buffer);
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

    writeFullFollows(player: Player): void {
        // full update necessary to clear client zone memory
        player.writeHighPriority(ServerProt.UPDATE_ZONE_FULL_FOLLOWS, this.x, this.z, player.loadedX, player.loadedZ);
        for (const obj of this.getAllObjsUnsafe(true)) {
            if (obj.receiverId !== -1 && obj.receiverId !== player.pid) {
                continue;
            }
            player.writeHighPriority(ServerProt.UPDATE_ZONE_PARTIAL_FOLLOWS, this.x, this.z, player.loadedX, player.loadedZ);
            if (obj.lifecycle === EntityLifeCycle.DESPAWN && obj.checkLifeCycle(World.currentTick)) {
                player.writeHighPriority(ServerProt.OBJ_ADD, Position.packZoneCoord(obj.x, obj.z), obj.type, obj.count);
            } else if (obj.lifecycle === EntityLifeCycle.RESPAWN && obj.checkLifeCycle(World.currentTick)) {
                player.writeHighPriority(ServerProt.OBJ_ADD, Position.packZoneCoord(obj.x, obj.z), obj.type, obj.count);
            }
        }
        for (const loc of this.getAllLocsUnsafe(true)) {
            if (loc.lifecycle === EntityLifeCycle.DESPAWN && loc.checkLifeCycle(World.currentTick)) {
                player.writeHighPriority(ServerProt.LOC_ADD_CHANGE, Position.packZoneCoord(loc.x, loc.z), loc.shape, loc.angle, loc.type);
            } else if (loc.lifecycle === EntityLifeCycle.RESPAWN && !loc.checkLifeCycle(World.currentTick)) {
                player.writeHighPriority(ServerProt.LOC_DEL, Position.packZoneCoord(loc.x, loc.z), loc.shape, loc.angle);
            }
        }
    }

    writePartialEncloses(player: Player): void {
        if (!this.shared) {
            return;
        }
        player.writeHighPriority(ServerProt.UPDATE_ZONE_PARTIAL_ENCLOSED, this.x, this.z, player.loadedX, player.loadedZ, this.shared);
    }

    writePartialFollows(player: Player): void {
        if (this.events.size === 0) {
            return;
        }
        player.writeHighPriority(ServerProt.UPDATE_ZONE_PARTIAL_FOLLOWS, this.x, this.z, player.loadedX, player.loadedZ);
        for (const event of this.events) {
            if (event.type !== ZoneEventType.FOLLOWS) {
                continue;
            }
            if (event.receiverId !== -1 && event.receiverId !== player.pid) {
                continue;
            }
            const out: Packet = Packet.alloc(0);
            out.pdata(event.buffer, 0, event.buffer.length);
            // released elsewhere
            player.highPriorityOut.push(out);
        }
    }

    reset(): void {
        this.events.clear();
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
            this.locs[coord]?.push(loc);
        }
        this.sortLocs(coord);

        this.events.add({
            prot: ServerProt.LOC_ADD_CHANGE,
            type: ZoneEventType.ENCLOSED,
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

        this.events.add({
            prot: ServerProt.LOC_DEL,
            type: ZoneEventType.ENCLOSED,
            receiverId: -1,
            buffer: Zone.locDel(coord, loc.shape, loc.angle)
        });
    }

    getLoc(x: number, z: number, type: number): Loc | null {
        for (const loc of this.getLocsSafe(Position.packZoneCoord(x, z))) {
            if (loc.type === type) {
                return loc;
            }
        }
        return null;
    }

    mergeLoc(loc: Loc, player: Player, startCycle: number, endCycle: number, south: number, east: number, north: number, west: number): void {
        this.events.add({
            prot: ServerProt.LOC_MERGE,
            type: ZoneEventType.ENCLOSED,
            receiverId: -1,
            buffer: Zone.locMerge(loc.x, loc.z, loc.shape, loc.angle, loc.type, startCycle, endCycle, player.pid, east, south, west, north)
        });
    }

    animLoc(loc: Loc, seq: number): void {
        this.events.add({
            prot: ServerProt.LOC_ANIM,
            type: ZoneEventType.ENCLOSED,
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

        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            this.events.add({
                prot: ServerProt.OBJ_ADD,
                type: ZoneEventType.FOLLOWS,
                receiverId: receiverId,
                buffer: Zone.objAdd(coord, obj.type, obj.count)
            });
        } else if (obj.lifecycle === EntityLifeCycle.RESPAWN) {
            this.events.add({
                prot: ServerProt.OBJ_ADD,
                type: ZoneEventType.ENCLOSED,
                receiverId: receiverId,
                buffer: Zone.objAdd(coord, obj.type, obj.count)
            });
        }
    }

    revealObj(obj: Obj, receiverId: number): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        obj.receiverId = -1;
        obj.reveal = -1;
        this.sortObjs(coord);

        this.events.add({
            prot: ServerProt.OBJ_REVEAL,
            type: ZoneEventType.ENCLOSED,
            receiverId: -1,
            buffer: Zone.objReveal(coord, obj.type, obj.count, receiverId)
        });
    }

    changeObj(obj: Obj, receiverId: number, oldCount: number, newCount: number): void {
        const coord: number = Position.packZoneCoord(obj.x, obj.z);
        obj.count = newCount;
        this.sortObjs(coord);

        this.events.add({
            prot: ServerProt.OBJ_COUNT,
            type: ZoneEventType.FOLLOWS,
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

        if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
            this.events.add({
                prot: ServerProt.OBJ_DEL,
                type: ZoneEventType.FOLLOWS,
                receiverId: -1,
                buffer: Zone.objDel(coord, obj.type)
            });
        } else if (obj.lifecycle === EntityLifeCycle.RESPAWN) {
            this.events.add({
                prot: ServerProt.OBJ_DEL,
                type: ZoneEventType.ENCLOSED,
                receiverId: -1,
                buffer: Zone.objDel(coord, obj.type)
            });
        }
    }

    // ---- not tied to any entities ----

    animMap(x: number, z: number, spotanim: number, height: number, delay: number): void {
        this.events.add({
            prot: ServerProt.MAP_ANIM,
            type: ZoneEventType.ENCLOSED,
            receiverId: -1,
            buffer: Zone.mapAnim(Position.packZoneCoord(x, z), spotanim, height, delay)
        });
    }

    mapProjAnim(x: number, z: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number): void {
        this.events.add({
            prot: ServerProt.MAP_PROJANIM,
            type: ZoneEventType.ENCLOSED,
            receiverId: -1,
            buffer: Zone.mapProjAnim(x, z, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc)
        });
    }

    getObj(x: number, z: number, type: number, receiverId: number): Obj | null {
        for (const obj of this.getObjsSafe(Position.packZoneCoord(x, z))) {
            if ((obj.receiverId !== -1 && obj.receiverId !== receiverId) || obj.type !== type) {
                continue;
            }
            return obj;
        }
        return null;
    }

    *getAllPlayersSafe(): IterableIterator<Player> {
        for (const uid of this.players) {
            const player: Player | null = World.getPlayerByUid(uid);
            if (player && player.checkLifeCycle(World.currentTick)) {
                yield player;
            }
        }
    }

    *getAllNpcsSafe(): IterableIterator<Npc> {
        for (const nid of this.npcs) {
            const npc: Npc | null = World.getNpc(nid);
            if (npc && npc.checkLifeCycle(World.currentTick)) {
                yield npc;
            }
        }
    }

    *getAllObjsSafe(): IterableIterator<Obj> {
        for (let index: number = 0; index < this.objs.length; index++) {
            const objs: Obj[] | null = this.objs[index];
            if (objs) {
                for (let i: number = 0; i < objs.length; i++) {
                    const obj: Obj = objs[i];
                    if (obj.checkLifeCycle(World.currentTick)) {
                        yield obj;
                    }
                }
            }
        }
    }

    *getObjsSafe(coord: number): IterableIterator<Obj> {
        const objs: Obj[] | null = this.objs[coord];
        if (objs) {
            for (let i: number = 0; i < objs.length; i++) {
                const obj: Obj = objs[i];
                if (obj.checkLifeCycle(World.currentTick)) {
                    yield obj;
                }
            }
        }
    }

    *getAllObjsUnsafe(reverse: boolean = false): IterableIterator<Obj> {
        for (let index: number = 0; index < this.objs.length; index++) {
            const objs: Obj[] | null = this.objs[index];
            if (objs) {
                if (reverse) {
                    for (let i: number = objs.length - 1; i >= 0; i--) {
                        yield objs[i];
                    }
                } else {
                    for (let i: number = 0; i < objs.length; i++) {
                        yield objs[i];
                    }
                }
            }
        }
    }

    *getAllLocsSafe(): IterableIterator<Loc> {
        for (let index: number = 0; index < this.locs.length; index++) {
            const locs: Loc[] | null = this.locs[index];
            if (locs) {
                for (let i: number = 0; i < locs.length; i++) {
                    const loc: Loc = locs[i];
                    if (loc.checkLifeCycle(World.currentTick)) {
                        yield loc;
                    }
                }
            }
        }
    }

    *getLocsSafe(coord: number): IterableIterator<Loc> {
        const locs: Loc[] | null = this.locs[coord];
        if (locs) {
            for (let i: number = 0; i < locs.length; i++) {
                const loc: Loc = locs[i];
                if (loc.checkLifeCycle(World.currentTick)) {
                    yield loc;
                }
            }
        }
    }

    *getAllLocsUnsafe(reverse: boolean = false): IterableIterator<Loc> {
        for (let index: number = 0; index < this.locs.length; index++) {
            const locs: Loc[] | null = this.locs[index];
            if (locs) {
                if (reverse) {
                    for (let i: number = locs.length - 1; i >= 0; i--) {
                        yield locs[i];
                    }
                } else {
                    for (let i: number = 0; i < locs.length; i++) {
                        yield locs[i];
                    }
                }
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
