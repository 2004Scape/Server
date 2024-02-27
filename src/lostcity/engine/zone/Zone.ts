import Packet from '#jagex2/io/Packet.js';
import Loc from '#lostcity/entity/Loc.js';
import Npc from '#lostcity/entity/Npc.js';
import Obj from '#lostcity/entity/Obj.js';
import Player from '#lostcity/entity/Player.js';
import { ServerProt, ServerProtEncoders } from '#lostcity/server/ServerProt.js';
import World from '#lostcity/engine/World.js';
import { LocShapes } from '#lostcity/engine/collision/LocShape.js';
import PathingEntity from '#lostcity/entity/PathingEntity.js';
import LocType from '#lostcity/cache/LocType.js';
import BlockWalk from '#lostcity/entity/BlockWalk.js';
import ZoneManager from './ZoneManager.js';

export default class Zone {
    index = -1; // packed coord
    level = 0;
    buffer: Packet = new Packet();
    events: Packet[] = [];

    // zone entities
    players: Set<number> = new Set(); // list of player uids
    npcs: Set<number> = new Set(); // list of npc nids (not uid because type may change)

    // locs - bits 0-2 = x (local), bits 3-5 = z (local), bits 6-7 = layer, bit 8 = static
    // loc info - bits 0-15 = type, bits 16-20 = shape, bits 21-23 = angle
    locs: Set<number> = new Set();
    locInfo: Map<number, number> = new Map();
    locDelEvent: Set<number> = new Set();
    locAddEvent: Set<number> = new Set();
    locDelCached: Map<number, Packet> = new Map();
    locAddCached: Map<number, Packet> = new Map();
    locDelTimer: Map<number, number> = new Map();
    locAddTimer: Map<number, number> = new Map();
    locChangeTimer: Map<number, number> = new Map();

    staticObjs: Obj[] = []; // source of truth from map
    staticObjAddCached: Packet[] = [];
    staticObjDelCached: Packet[] = [];
    objs: Obj[] = []; // objs actually in the zone

    constructor(index: number, level: number) {
        this.index = index;
        this.level = level;
    }

    debug() {
        // console.log('zone', this.index);

        if (this.buffer.length > 0) {
            // console.log('buffer', this.buffer);
        }

        if (this.locDelEvent.size > 0 || this.locAddEvent.size > 0) {
            // console.log('events', this.locDelEvent.size, this.locAddEvent.size);
        }

        if (this.locDelCached.size > 0 || this.locAddCached.size > 0) {
            // console.log('cached', this.locDelCached.size, this.locAddCached.size);
        }

        if (this.locDelTimer.size > 0 || this.locAddTimer.size > 0 || this.locChangeTimer.size > 0) {
            // console.log('timer', this.locDelTimer.size, this.locAddTimer.size, this.locChangeTimer.size);
        }

        for (const [packed, timer] of this.locDelTimer) {
            // console.log('del', packed, timer - World.currentTick);
        }

        for (const [packed, timer] of this.locAddTimer) {
            // console.log('add', packed, timer - World.currentTick);
        }

        for (const [packed, timer] of this.locChangeTimer) {
            // console.log('change', packed, timer - World.currentTick);
        }

        // console.log('----');
    }

    cycle() {
        // despawn
        for (const [packed, timer] of this.locAddTimer) {
            if (timer - World.currentTick <= 0) {
                // console.log('locAddTimer: despawning loc on tile');
                this.locAddTimer.delete(packed);
                this.locAddCached.delete(packed);

                const isStatic = (packed >> 8) & 1;
                if (!isStatic) {
                    this.locDelEvent.add(packed);
                }
            }
        }

        for (const obj of this.objs) {
            //
        }

        // respawn
        for (const [packed, timer] of this.locDelTimer) {
            if (timer - World.currentTick <= 0) {
                // console.log('locDelTimer: despawning loc on tile');
                this.locDelTimer.delete(packed);
                this.locDelCached.delete(packed);

                const staticPacked = packed | (1 << 8);
                if (this.locs.has(staticPacked)) {
                    // console.log('locDelTimer: respawning static loc on tile');
                    this.locs.delete(packed);
                    this.locInfo.delete(packed);
                    this.locAddEvent.add(staticPacked);
                }
            }
        }

        for (const [packed, timer] of this.locChangeTimer) {
            if (timer - World.currentTick <= 0) {
                // console.log('locChangeTimer: changing loc on tile');
                this.locs.delete(packed);
                this.locInfo.delete(packed);
                this.locChangeTimer.delete(packed);
                this.locAddCached.delete(packed);

                const staticPacked = packed | (1 << 8);
                this.locAddEvent.add(staticPacked);
            }
        }

        for (const obj of this.staticObjs) {
            //
        }

        // shared events (this tick)
        this.computeSharedEvents();
    }

    computeSharedEvents() {
        this.buffer = new Packet();

        for (const packed of this.locDelEvent) {
            let info = this.locInfo.get(packed);
            if (typeof info === 'undefined') {
                // deleted static loc
                info = this.locInfo.get(packed | (1 << 8));
            }

            if (typeof info === 'undefined') {
                continue;
            }

            const x = packed & 0x7;
            const z = (packed >> 3) & 0x7;

            const id = info & 0xFFFF;
            const shape = (info >> 16) & 0x1F;
            const angle = (info >> 21) & 3;

            const buf = Zone.write(ServerProt.LOC_DEL, x, z, shape, angle);
            this.buffer.pdata(buf);

            const isStatic = (packed >> 8) & 1;
            if (isStatic) {
                this.locDelCached.set(packed, buf);
            } else {
                this.locs.delete(packed);
                this.locInfo.delete(packed);
            }

            const type = LocType.get(id);
            const { x: zoneX, z: zoneZ } = ZoneManager.unpackIndex(this.index);
            World.collisionManager.changeLocCollision(shape, angle, type.blockrange, type.length, type.width, type.active, zoneX + x, zoneZ + z, this.level, false);

            // console.log('locDelEvent:', x, z, id, shape, angle, isStatic);
        }

        for (const packed of this.locAddEvent) {
            const info = this.locInfo.get(packed);
            if (typeof info === 'undefined') {
                // console.log('locAddEvent: missing loc info');
                continue;
            }

            const x = packed & 0x7;
            const z = (packed >> 3) & 0x7;

            const id = info & 0xFFFF;
            const shape = (info >> 16) & 0x1F;
            const angle = (info >> 21) & 3;

            const buf = Zone.write(ServerProt.LOC_ADD_CHANGE, x, z, shape, angle, id);
            this.buffer.pdata(buf);

            const isStatic = (packed >> 8) & 1;
            if (!isStatic) {
                this.locAddCached.set(packed, buf);
            }

            const type = LocType.get(id);
            const { x: zoneX, z: zoneZ } = ZoneManager.unpackIndex(this.index);
            World.collisionManager.changeLocCollision(shape, angle, type.blockrange, type.length, type.width, type.active, zoneX + x, zoneZ + z, this.level, type.blockwalk);

            // console.log('locAddEvent:', x, z, id, shape, angle, isStatic);
        }

        for (const event of this.events) {
            this.buffer.pdata(event);
        }

        this.locDelEvent = new Set();
        this.locAddEvent = new Set();
        this.events = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static write(opcode: ServerProt, ...args: any[]) {
        const buf = new Packet();
        buf.p1(opcode);
        ServerProtEncoders[opcode](buf, ...args);
        return buf;
    }

    anim(x: number, z: number, spotanim: number, height: number, delay: number) {
        this.events.push(Zone.write(ServerProt.MAP_ANIM, x, z, spotanim, height, delay));
    }

    projanim(x: number, z: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number) {
        this.events.push(Zone.write(ServerProt.MAP_PROJANIM, x, z, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc));
    }

    locmerge(loc: Loc, player: Player, startCycle: number, endCycle: number, south: number, east: number, north: number, west: number) {
        this.events.push(Zone.write(ServerProt.LOC_MERGE, loc.x, loc.z, loc.shape, loc.angle, loc.type, startCycle, endCycle, player.pid, east, south, west, north));
    }

    locanim(loc: Loc, seq: number) {
        this.events.push(Zone.write(ServerProt.LOC_ANIM, loc.x, loc.z, loc.shape, loc.angle, seq));
    }

    // ----

    enter(entity: PathingEntity) {
        if (entity instanceof Player && !this.players.has(entity.uid)) {
            this.players.add(entity.uid);
        } else if (entity instanceof Npc && !this.npcs.has(entity.nid)) {
            this.npcs.add(entity.nid);

            switch (entity.blockWalk) {
                case BlockWalk.NPC:
                    World.collisionManager.changeNpcCollision(entity.width, entity.x, entity.z, entity.level, true);
                    break;
                case BlockWalk.ALL:
                    World.collisionManager.changeNpcCollision(entity.width, entity.x, entity.z, entity.level, true);
                    World.collisionManager.changePlayerCollision(entity.width, entity.x, entity.z, entity.level, true);
                    break;
            }
        }
    }

    leave(entity: PathingEntity) {
        if (entity instanceof Player) {
            this.players.delete(entity.uid);
        } else if (entity instanceof Npc) {
            this.npcs.delete(entity.nid);

            switch (entity.blockWalk) {
                case BlockWalk.NPC:
                    World.collisionManager.changeNpcCollision(entity.width, entity.x, entity.z, entity.level, false);
                    break;
                case BlockWalk.ALL:
                    World.collisionManager.changeNpcCollision(entity.width, entity.x, entity.z, entity.level, false);
                    World.collisionManager.changePlayerCollision(entity.width, entity.x, entity.z, entity.level, false);
                    break;
            }
        }
    }

    // ----

    addStaticLoc(absX: number, absZ: number, id: number, shape: number, angle: number) {
        const x = absX & 0x7;
        const z = absZ & 0x7;

        const packed = x | (z << 3) | (LocShapes.layer(shape) << 6) | (1 << 8);
        const packedInfo = id | (shape << 16) | (angle << 21);

        this.locs.add(packed);
        this.locInfo.set(packed, packedInfo);

        const type = LocType.get(id);
        World.collisionManager.changeLocCollision(shape, angle, type.blockrange, type.length, type.width, type.active, absX, absZ, this.level, type.blockwalk);
    }

    addLoc(absX: number, absZ: number, id: number, shape: number, angle: number, duration: number) {
        const x = absX & 0x7;
        const z = absZ & 0x7;

        const packed = x | (z << 3) | (LocShapes.layer(shape) << 6);
        const packedInfo = id | (shape << 16) | (angle << 21);

        const staticPacked = packed | (1 << 8);
        const staticInfo = this.locInfo.get(staticPacked);

        if (this.locs.has(staticPacked) && typeof staticInfo !== 'undefined') {
            const id = packedInfo & 0xFFFF;
            const staticId = staticInfo & 0xFFFF;

            if (id === staticId) {
                this.locs.delete(packed);
                this.locInfo.delete(packed);
                this.locAddEvent.add(staticPacked);
                return;
            }
        }

        this.locs.add(packed);
        this.locInfo.set(packed, packedInfo);
        // console.log('addLoc(): adding loc on tile');

        const type = LocType.get(id);
        World.collisionManager.changeLocCollision(shape, angle, type.blockrange, type.length, type.width, type.active, absX, absZ, this.level, type.blockwalk);

        if (this.locDelEvent.has(packed)) {
            // console.log('addLoc(): clearing old delete event');
            this.locDelEvent.delete(packed);
            this.locDelCached.delete(packed);
            this.locDelTimer.delete(packed);
        }

        this.locAddEvent.add(packed);
        this.locAddTimer.set(packed, World.currentTick + duration);
    }

    changeLoc(absX: number, absZ: number, id: number, shape: number, angle: number, duration: number) {
        const x = absX & 0x7;
        const z = absZ & 0x7;

        const packed = x | (z << 3) | (LocShapes.layer(shape) << 6);

        // console.log('changeLoc(): changing loc on tile');
        this.locs.add(packed);
        this.locInfo.set(packed, id | (shape << 16) | (angle << 21));
        this.locAddEvent.add(packed);
        this.locChangeTimer.set(packed, World.currentTick + duration);
    }

    removeLoc(absX: number, absZ: number, shape: number, duration: number) {
        const x = absX & 0x7;
        const z = absZ & 0x7;

        // delete dynamic loc if it exists
        const packed = x | (z << 3) | (LocShapes.layer(shape) << 6);
        const info = this.locInfo.get(packed);
        if (this.locs.has(packed) && typeof info !== 'undefined') {
            // console.log('removeLoc(): deleting loc on tile');
            // this.locs.delete(packed);
            // this.locInfo.delete(packed);

            const type = LocType.get(info & 0xFFFF);
            const angle = (info >> 21) & 3;

            World.collisionManager.changeLocCollision(shape, angle, type.blockrange, type.length, type.width, type.active, absX, absZ, this.level, false);
        }

        // (temporarily) delete static loc if it exists
        const staticPacked = packed | (1 << 8);
        const staticInfo = this.locInfo.get(staticPacked);
        if (this.locs.has(staticPacked) && typeof staticInfo !== 'undefined') {
            // console.log('removeLoc(): deleting static loc on tile');
            this.locs.add(packed); // temporarily add dynamic loc to prevent static loc from respawning
            this.locInfo.delete(packed);

            const type = LocType.get(staticInfo & 0xFFFF);
            const angle = (staticInfo >> 21) & 3;

            World.collisionManager.changeLocCollision(shape, angle, type.blockrange, type.length, type.width, type.active, absX, absZ, this.level, false);
        }

        if (this.locAddEvent.has(packed)) {
            // console.log('removeLoc(): clearing old add event');
            this.locAddEvent.delete(packed);
            this.locAddCached.delete(packed);
            this.locAddTimer.delete(packed);
        }

        this.locDelEvent.add(packed);
        this.locDelTimer.set(packed, World.currentTick + duration);
    }

    getLoc(absX: number, absZ: number, layer: number): Loc | null {
        const x = absX & 0x7;
        const z = absZ & 0x7;

        // dynamic loc on the same layer takes precedence over static loc
        const packed = x | (z << 3) | (layer << 6);
        const info = this.locInfo.get(packed);

        if (this.locs.has(packed) && typeof info === 'undefined') {
            // static loc has been despawned
            return null;
        } else if (this.locs.has(packed) && typeof info !== 'undefined') {
            const id = info & 0xFFFF;
            const shape = (info >> 16) & 0x1F;
            const angle = (info >> 21) & 3;

            // legacy code compatibility
            const type = LocType.get(id);
            return new Loc(this.level, absX, absZ, type.width, type.length, id, shape, angle);
        }

        // static loc
        const staticPacked = packed | (1 << 8);
        const staticInfo = this.locInfo.get(staticPacked);

        if (this.locs.has(staticPacked) && typeof staticInfo !== 'undefined') {
            const id = staticInfo & 0xFFFF;
            const shape = (staticInfo >> 16) & 0x1F;
            const angle = (staticInfo >> 21) & 3;

            // legacy code compatibility
            const type = LocType.get(id);
            return new Loc(this.level, absX, absZ, type.width, type.length, id, shape, angle);
        }

        return null;
    }

    // ----

    addStaticObj(obj: Obj) {
        this.staticObjs.push(obj);
        this.addObj(Obj.clone(obj), null, -1); // temp

        const buf = Zone.write(ServerProt.OBJ_ADD, obj.x, obj.z, obj.type, obj.count);
        this.staticObjAddCached.push(buf);
    }

    addObj(obj: Obj, receiver: Player | null, duration: number) {
        this.objs.push(obj);
    }

    removeObj(obj: Obj, receiver: Player | null) {
    }

    getObj(x: number, z: number, type: number): Obj | null {
        for (const obj of this.objs) {
            if (obj.x === x && obj.z === z && obj.type === type) {
                return obj;
            }
        }

        return null;
    }
}
