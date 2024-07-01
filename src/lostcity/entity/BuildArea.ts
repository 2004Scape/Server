import ZoneMap from '#lostcity/engine/zone/ZoneMap.js';
import {Position} from '#lostcity/entity/Position.js';
import Player from '#lostcity/entity/Player.js';
import World from '#lostcity/engine/World.js';
import Npc from '#lostcity/entity/Npc.js';
import Entity from '#lostcity/entity/Entity.js';

export default class BuildArea {
    private static readonly INTERVAL: number = 10;
    private static readonly PREFERRED_PLAYERS: number = 250;
    private static readonly PREFERRED_NPCS: number = 255;
    private static readonly PREFERRED_VIEW_DISTANCE: number = 16;

    // constructor
    readonly npcs: Set<number>; // observed npcs
    readonly players: Set<number>; // observed players
    readonly loadedZones: Set<number>;
    readonly activeZones: Set<number>;
    readonly extendedInfo: Set<{id: number, added: boolean}>;

    // runtime
    forceViewDistance: boolean = false;
    viewDistance: number = BuildArea.PREFERRED_VIEW_DISTANCE;

    private lastResize: number = 0;

    constructor() {
        this.npcs = new Set();
        this.players = new Set();
        this.loadedZones = new Set();
        this.activeZones = new Set();
        this.extendedInfo = new Set();
    }

    resize(): void {
        if (this.forceViewDistance) {
            return;
        }
        if (this.players.size >= BuildArea.PREFERRED_PLAYERS) {
            if (this.viewDistance > 0) {
                this.viewDistance--;
            }
            this.lastResize = 0;
            return;
        }
        if (++this.lastResize >= BuildArea.INTERVAL) {
            if (this.viewDistance < BuildArea.PREFERRED_VIEW_DISTANCE) {
                this.viewDistance++;
            } else {
                this.lastResize = 0;
            }
        }
    }

    *getNearbyPlayers(player: Player): IterableIterator<Player> {
        players: for (const zoneIndex of this.proximitySort(player.x, player.z, this.activeZones)) {
            for (const other of this.getNearby(World.getZoneIndex(zoneIndex).getAllPlayersSafe(), player, this.viewDistance)) {
                if (this.players.size >= BuildArea.PREFERRED_PLAYERS) {
                    break players;
                }
                if (this.players.has(other.uid)) {
                    continue;
                }
                if (other.uid === player.uid) {
                    continue;
                }
                yield other;
            }
        }
    }

    *getNearbyNpcs(player: Player): IterableIterator<Npc> {
        npcs: for (const zoneIndex of this.proximitySort(player.x, player.z, this.activeZones)) {
            for (const npc of this.getNearby(World.getZoneIndex(zoneIndex).getAllNpcsSafe(), player, 16)) {
                if (this.npcs.size >= BuildArea.PREFERRED_NPCS) {
                    break npcs;
                }
                if (this.npcs.has(npc.nid)) {
                    continue;
                }
                yield npc;
            }
        }
    }

    private *getNearby<T extends Entity>(entities: IterableIterator<T>, player: Player, distance: number): IterableIterator<T> {
        const absLeftX: number = player.originX - 48;
        const absRightX: number = player.originX + 48;
        const absTopZ: number = player.originZ + 48;
        const absBottomZ: number = player.originZ - 48;

        for (const entity of entities) {
            if (entity.x <= absLeftX || entity.x >= absRightX || entity.z >= absTopZ || entity.z <= absBottomZ) {
                continue;
            }
            if (!Position.isWithinDistanceSW(player, entity, distance)) {
                continue;
            }
            yield entity;
        }
    }

    private proximitySort(zoneX: number, zoneZ: number, zones: Set<number>): number[] {
        return Array.from(zones.values())
            .map(zoneIndex => this.zoneToDistance(zoneIndex, zoneX, zoneZ))
            .sort((a, b) => a.distance - b.distance)
            .map(({zoneIndex}) => zoneIndex);
    }

    private zoneToDistance(zoneIndex: number, zoneX: number, zoneZ: number): {distance: number, zoneIndex: number} {
        const pos: Position = ZoneMap.unpackIndex(zoneIndex);
        const distance: number = Math.abs(pos.x - zoneX) + Math.abs(pos.z - zoneZ);
        return {zoneIndex, distance};
    }
}