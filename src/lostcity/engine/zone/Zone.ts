import Packet from '#jagex2/io/Packet.js';
import Loc from '#lostcity/entity/Loc.js';
import Npc from '#lostcity/entity/Npc.js';
import Obj from '#lostcity/entity/Obj.js';
import Player from '#lostcity/entity/Player.js';
import ServerProt, { ServerProtEncoders } from '#lostcity/server/ServerProt.js';
import World from '#lostcity/engine/World.js';
import PathingEntity from '#lostcity/entity/PathingEntity.js';
import LocType from '#lostcity/cache/LocType.js';
import BlockWalk from '#lostcity/entity/BlockWalk.js';
import ZoneManager from './ZoneManager.js';
import { locShapeLayer } from '@2004scape/rsmod-pathfinder';

export default class Zone {
    /**
     * The amount of cycles a dynamic object will be kept in the
     * zone before being despawned.
     */
    public static OBJ_LIFETIME_CYCLES = 300;

    /**
     * The amount of cycles a dynamic object will be kept private
     * to the receiver before being made public.
     */
    public static OBJ_PRIVATE_LIFETIME_CYCLES = 100;

    index = -1; // packed coord
    level = 0;
    sharedEventBuffer: Packet = new Packet();
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

    /**
     * A list of public objects in the zone.
     */
    private publicObjs: { obj: Obj, timer: number }[] = [];

    /**
     * A map of private objects in the zone, keyed by the player.
     * 
     * This is keyed by the Player object because we use uid in most places,
     * but pid in the OBJ_REVEAL packet.
     */
    private privateObjs: Map<Player, { obj: Obj, timer: number, revealTimer: number }[]> = new Map();

    /**
     * A list of public object events that occurred in the last cycle.
     */
    private objEvents: Packet[] = [];

    /**
     * A map of private object events that occurred in the last cycle,
     * keyed by the player's uid.
     */
    private privateObjEvents: Map<number, Packet[]> = new Map();

    constructor(index: number, level: number) {
        this.index = index;
        this.level = level;
    }

    debug() {
        // console.log('zone', this.index);

        if (this.sharedEventBuffer.length > 0) {
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

    private revealObj(obj: Obj, timer: number, receiver: Player) {
        const privateObjs = this.privateObjs.get(receiver) ?? [];
        const index = privateObjs.findIndex(o => o.obj.equals(obj));

        // TODO (jkm) what to do here?
        if (index === -1) {
            console.log('revealObj: obj not found');
            return;
        }

        privateObjs.splice(index, 1);
        this.publicObjs.push({ obj, timer });

        this.addObjEvent(
            Zone.write(ServerProt.OBJ_REVEAL, obj.x, obj.z, obj.type, obj.count, receiver.pid),
            null);
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

        // objs that are currently private to a player
        for (const [ player, objs ] of this.privateObjs) {
            const objsToRemove: number[] = [];

            for (const [ index, obj ] of objs.entries()) {
                if (obj.revealTimer - World.currentTick == 0) {
                    this.revealObj(obj.obj, obj.timer, player);
                }

                // check if obj has expired
                if (obj.timer - World.currentTick == 0) {
                    this.addObjEvent(
                        Zone.write(ServerProt.OBJ_DEL, obj.obj.x, obj.obj.z, obj.obj.type, obj.obj.count),
                        player.uid);

                    objsToRemove.push(index);
                }
            }
            
            this.privateObjs.set(player, objs.filter((_, i) => !objsToRemove.includes(i)));
        }

        // objs that are currently public
        for (const [ index, obj ] of this.publicObjs.entries()) {
            const objsToRemove: number[] = [];

            if (obj.timer - World.currentTick == 0) {
                this.addObjEvent(
                    Zone.write(ServerProt.OBJ_DEL, obj.obj.x, obj.obj.z, obj.obj.type, obj.obj.count),
                    null);

                objsToRemove.push(index);
            }

            this.publicObjs = this.publicObjs.filter((_, i) => !objsToRemove.includes(i));
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
        this.sharedEventBuffer = new Packet();

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
            this.sharedEventBuffer.pdata(buf);

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
            this.sharedEventBuffer.pdata(buf);

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
            this.sharedEventBuffer.pdata(event);
        }

        this.locDelEvent = new Set();
        this.locAddEvent = new Set();
        this.events = [];
    }

    /**
     * Get a packet containing all events that occurred in the zone
     * during the last cycle.
     * 
     * @param player The observing player
     * @returns The packet containing the events
     */
    public getEvents(player: Player): Packet {
        return this.writeObjEvents(player, this.sharedEventBuffer.copy());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static write(opcode: ServerProt, ...args: any[]) {
        const buf = new Packet();
        buf.p1(opcode.id);
        ServerProtEncoders[opcode.id](buf, ...args);
        return buf;
    }

    /**
     * TODO (jkm) consider rename to anim 
     */
    animMap(x: number, z: number, spotanim: number, height: number, delay: number) {
        this.events.push(Zone.write(ServerProt.MAP_ANIM, x, z, spotanim, height, delay));
    }

    /**
     * TODO (jkm) consider rename to projanim 
     */
    mapProjAnim(x: number, z: number, dstX: number, dstZ: number, target: number, spotanim: number, srcHeight: number, dstHeight: number, startDelay: number, endDelay: number, peak: number, arc: number) {
        this.events.push(Zone.write(ServerProt.MAP_PROJANIM, x, z, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc));
    }

    /**
     * TODO (jkm) consider rename to locmerge
     */
    mergeLoc(loc: Loc, player: Player, startCycle: number, endCycle: number, south: number, east: number, north: number, west: number) {
        this.events.push(Zone.write(ServerProt.LOC_MERGE, loc.x, loc.z, loc.shape, loc.angle, loc.type, startCycle, endCycle, player.pid, east, south, west, north));
    }

    /**
     * TODO (jkm) consider rename to locanim
     */
    animLoc(loc: Loc, seq: number) {
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

        const packed = x | (z << 3) | (locShapeLayer(shape) << 6) | (1 << 8);
        const packedInfo = id | (shape << 16) | (angle << 21);

        this.locs.add(packed);
        this.locInfo.set(packed, packedInfo);

        const type = LocType.get(id);
        World.collisionManager.changeLocCollision(shape, angle, type.blockrange, type.length, type.width, type.active, absX, absZ, this.level, type.blockwalk);
    }

    addLoc(absX: number, absZ: number, id: number, shape: number, angle: number, duration: number) {
        const x = absX & 0x7;
        const z = absZ & 0x7;

        const packed = x | (z << 3) | (locShapeLayer(shape) << 6);
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

        const packed = x | (z << 3) | (locShapeLayer(shape) << 6);

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
        const packed = x | (z << 3) | (locShapeLayer(shape) << 6);
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
        if (receiver) {
            // get the private objects for the receiver
            let privateObjs = this.privateObjs.get(receiver);
            if (!privateObjs) {
                privateObjs = [];
                this.privateObjs.set(receiver, privateObjs);
            }

            // create the object
            privateObjs.push({
                obj: Obj.clone(obj),
                timer: World.currentTick + duration,
                revealTimer: World.currentTick + Zone.OBJ_PRIVATE_LIFETIME_CYCLES
            });

            // broadcast to the receiver
            this.addObjEvent(
                Zone.write(ServerProt.OBJ_ADD, obj.x, obj.z, obj.type, obj.count),
                receiver.uid);
        } else {
            // create the object
            this.publicObjs.push({ obj, timer: World.currentTick + duration });

            // broadcast to all players
            this.addObjEvent(
                Zone.write(ServerProt.OBJ_ADD, obj.x, obj.z, obj.type, obj.count),
                null);
        }
    }

    removeObj(obj: Obj, receiver: Player | null) {
        // if a receiver is supplied then check their private objects first
        if (receiver) {
            const objs = this.privateObjs.get(receiver) ?? [];
            const matchingPrivateObjIndex = objs.findIndex(o => o.obj.equals(obj));

            if (matchingPrivateObjIndex !== -1) {
                // its private so we can broadcast the removal to the receiver only
                this.addObjEvent(
                    Zone.write(ServerProt.OBJ_DEL, obj.x, obj.z, obj.type, obj.count),
                    receiver.uid);

                objs.splice(matchingPrivateObjIndex, 1);
                
                return;
            }
        }

        // otherwise look publicly
        const matchingPublicObjIndex = this.publicObjs.findIndex(o => o.obj.equals(obj));
        if (matchingPublicObjIndex !== -1) {
            // the obj is public so we need to broadcast the removal to all players
            this.addObjEvent(
                Zone.write(ServerProt.OBJ_DEL, obj.x, obj.z, obj.type, obj.count),
                null);

            this.publicObjs.splice(matchingPublicObjIndex, 1);

            return;
        }

        // TODO (jkm) what to do here?
        console.log('removeObj: obj not found');
    }

    getDynObj(x: number, z: number, type: number): Obj | null {
        const dynamicObj = this.objs.findIndex(obj => obj.x === x && obj.z === z && obj.type === type);
        if (dynamicObj !== -1) {
            return this.objs[dynamicObj];
        }
        return null;
    }

    /**
     * Find an object at a location in the zone, visible to a given player.
     * 
     * @param x The x coordinate within the zone 
     * @param z The z coordinate within the zone
     * @param type The object type
     * @param player The observing player
     * @returns The object, or null if not found
     */
    public getObj(x: number, z: number, type: number, player: Player): Obj | null {
        // look through private objects first
        const privateObjs = this.privateObjs.get(player) ?? [];
        for (const { obj } of privateObjs){
            if (obj.x === x && obj.z === z && obj.type === type) {
                return obj;
            }
        }

        // search all public objects in the zone
        for (const { obj } of this.publicObjs){
            if (obj.x === x && obj.z === z && obj.type === type) {
                return obj;
            }
        }

        return null;
    }
    
    /**
     * Broadcast an object event packet.
     * @param packet The packet to broadcast
     * @param receiverUid The player uid to broadcast the event to, or null to broadcast to all players
     */
    private addObjEvent(packet: Packet, receiverUid: number | null) {
        if (receiverUid !== null) {
            let packets = this.privateObjEvents.get(receiverUid);

            if (!packets) {
                packets = [];
                this.privateObjEvents.set(receiverUid, packets);
            }

            packets.push(packet);
        } else {
            this.objEvents.push(packet);
        }
    }

    /**
     * Write object events into a packet.
     * 
     * @param player The observing player
     * @param buffer The packet to write the events to
     * @returns The packet
     */
    private writeObjEvents(player: Player, buffer: Packet): Packet {        
        for (const packet of this.objEvents) {
            buffer.pdata(packet);
        }

        const packets = this.privateObjEvents.get(player.uid) ?? [];

        for (const packet of packets) {
            buffer.pdata(packet);
        }

        return buffer;
    }

    /**
     * Get a packet containing the total representation of all dynamic objects
     * in the zone.
     * 
     * @param player The observing player 
     * @returns The packet containing the full state of all dynamic objects
     */
    public getDynamicObjState(player: Player): Packet[] {
        const privateObjs = this.privateObjs.get(player) ?? [];
        const packets: Packet[] = [];

        for (const { obj } of privateObjs) {
            const buf = Zone.write(ServerProt.OBJ_ADD, obj.x, obj.z, obj.type, obj.count);
            packets.push(buf);
        }

        for (const { obj } of this.publicObjs) {
            const buf = Zone.write(ServerProt.OBJ_ADD, obj.x, obj.z, obj.type, obj.count);
            packets.push(buf);
        }

        return packets;
    }

    /**
     * Clear any events from the last cycle.
     */
    public cleanup() {
        this.privateObjEvents.clear();
        this.objEvents = [];
    }
}
