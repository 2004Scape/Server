import 'dotenv/config';

import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, ClientProtCategoryLimit, IncomingPacket, OutgoingPacket } from '@2004scape/rsbuf';

import Component from '#/cache/config/Component.js';
import InvType from '#/cache/config/InvType.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import WorldStat from '#/engine/WorldStat.js';
import Zone from '#/engine/zone/Zone.js';
import Packet from '#/io/Packet.js';
import ClientProtRepository from '#/network/rs225/client/prot/ClientProtRepository.js';
import ClientSocket from '#/server/ClientSocket.js';
import LoggerEventType from '#/server/logger/LoggerEventType.js';
import NullClientSocket from '#/server/NullClientSocket.js';

export class NetworkPlayer extends Player {
    client: ClientSocket;
    userLimit = 0; // user packet limit
    clientLimit = 0; // client packet limit
    restrictedLimit = 0;

    userPath: number[] = [];
    opcalled: boolean = false;

    constructor(username: string, username37: bigint, hash64: bigint, client: ClientSocket) {
        super(username, username37, hash64);

        this.client = client;
        this.client.player = this;
    }

    decodeIn() {
        this.userPath = [];
        this.opcalled = false;

        if (!isClientConnected(this)) {
            return false;
        }

        this.lastConnected = World.currentTick;
        this.userLimit = 0;
        this.clientLimit = 0;
        this.restrictedLimit = 0;

        const bytesStart = this.client.in.pos;
        while (this.userLimit < ClientProtCategoryLimit.USER_EVENT && this.clientLimit < ClientProtCategoryLimit.CLIENT_EVENT && this.restrictedLimit < ClientProtCategoryLimit.RESTRICTED_EVENT && this.read()) {
            // empty
        }
        const bytesRead = bytesStart - this.client.in.pos;

        if (bytesRead > 0) {
            this.lastResponse = World.currentTick;
            World.cycleStats[WorldStat.BANDWIDTH_IN] += bytesRead;
        }

        return true;
    }

    static inBuf = Packet.alloc(1);

    read(): boolean {
        if (this.client.available < 1) {
            return false;
        }

        let packet: IncomingPacket | undefined;

        if (this.client.opcode === -1) {
            NetworkPlayer.inBuf.pos = 0;
            this.client.read(NetworkPlayer.inBuf.data, 0, 1);

            if (this.client.decryptor) {
                this.client.opcode = (NetworkPlayer.inBuf.g1() - this.client.decryptor.nextInt()) & 0xff;
            } else {
                this.client.opcode = NetworkPlayer.inBuf.g1();
            }

            packet = rsbuf.nextBufferedRead(this.client.opcode);
            if (!packet) {
                this.client.opcode = -1;
                this.client.close();
                return false;
            } else {
                this.client.waiting = packet.length;
            }
        }

        if (this.client.waiting === -1) {
            NetworkPlayer.inBuf.pos = 0;
            this.client.read(NetworkPlayer.inBuf.data, 0, 1);

            this.client.waiting = NetworkPlayer.inBuf.g1();
        } else if (this.client.waiting === -2) {
            NetworkPlayer.inBuf.pos = 0;
            this.client.read(NetworkPlayer.inBuf.data, 0, 2);

            this.client.waiting = NetworkPlayer.inBuf.g2();
            if (this.client.waiting > 1600) {
                this.client.close();
                return false;
            }
        }

        if (this.client.available < this.client.waiting) {
            return false;
        }

        NetworkPlayer.inBuf.pos = 0;
        this.client.read(NetworkPlayer.inBuf.data, 0, this.client.waiting);

        if (packet) {
            const internal: number = packet.id; // this one is diff
            const message = ClientProtRepository.getMessage(internal, NetworkPlayer.inBuf.data.subarray(0, this.client.waiting));
            if (message) {
                const handler = ClientProtRepository.getHandler(internal);
                const success: boolean = handler?.handle(message, this) ?? false;
                // todo: move out of model
                if (success && handler && handler.category === ClientProtCategory.USER_EVENT) {
                    this.userLimit++;
                } else if (success && handler && handler.category === ClientProtCategory.RESTRICTED_EVENT) {
                    this.restrictedLimit++;
                } else {
                    this.clientLimit++;
                }
            } else {
                this.clientLimit++;
            }
        }

        this.client.opcode = -1;
        return true;
    }

    encodeOut() {
        if (!isClientConnected(this)) {
            return;
        }

        if (this.modalMain !== this.lastModalMain || this.modalChat !== this.lastModalChat || this.modalSide !== this.lastModalSide || this.refreshModalClose) {
            if (this.refreshModalClose) {
                this.write(rsbuf.ifClose(this.pid));
            }
            this.refreshModalClose = false;

            this.lastModalMain = this.modalMain;
            this.lastModalChat = this.modalChat;
            this.lastModalSide = this.modalSide;
        }

        if (this.refreshModal) {
            if ((this.modalState & 1) !== 0 && (this.modalState & 4) !== 0) {
                this.write(rsbuf.ifOpenMainSide(this.pid, this.modalMain, this.modalSide));
            } else if ((this.modalState & 1) !== 0) {
                this.write(rsbuf.ifOpenMain(this.pid, this.modalMain));
            } else if ((this.modalState & 2) !== 0) {
                this.write(rsbuf.ifOpenChat(this.pid, this.modalChat));
            } else if ((this.modalState & 4) !== 0) {
                this.write(rsbuf.ifOpenSide(this.pid, this.modalSide));
            }

            this.refreshModal = false;
        }

        while (true) {
            const out: OutgoingPacket | undefined = rsbuf.nextBufferedWrite(this.pid);
            if (!out) {
                break;
            }
            const bytes: Uint8Array | undefined = out.bytes;
            if (bytes) {
                this.writeInner(bytes, out.id, out.length);
            }
        }
    }

    writeInner(bytes: Uint8Array, id: number, length: number): void {
        const client = this.client;
        if (!client) {
            return;
        }

        const buf = client.out;
        // const test = (1 + (prot.length === -1 ? 1 : prot.length === -2 ? 2 : 0)) + encoder.test(message);
        // if (buf.pos + test >= buf.length) {
        //     client.flush();
        // }

        buf.pos = 0;

        if (client.encryptor) {
            buf.p1(id + client.encryptor.nextInt());
        } else {
            buf.p1(id);
        }

        if (length === -1) {
            buf.p1(0);
        } else if (length === -2) {
            buf.p2(0);
        }

        const start: number = buf.pos;
        buf.pdata(bytes, 0, bytes.length);

        if (length === -1) {
            buf.psize1(buf.pos - start);
        } else if (length === -2) {
            buf.psize2(buf.pos - start);
        }

        this.client.send(buf.data.slice(0, buf.pos));
        World.cycleStats[WorldStat.BANDWIDTH_OUT] += buf.pos;
    }

    override logout() {
        this.write(rsbuf.logout(this.pid));
    }

    override terminate() {
        this.client.terminate();
    }

    override addSessionLog(event_type: LoggerEventType, message: string, ...args: string[]): void {
        World.addSessionLog(event_type, this.account_id, isClientConnected(this) ? this.client.uuid : 'disconnected', CoordGrid.packCoord(this.level, this.x, this.z), message, ...args);
    }

    override addWealthLog(change: number, message: string, ...args: string[]) {
        World.addSessionLog(LoggerEventType.WEALTH, this.account_id, isClientConnected(this) ? this.client.uuid : 'disconnected', CoordGrid.packCoord(this.level, this.x, this.z), change + ';' + message, ...args);
    }

    updateMap() {
        // update the camera after rebuild.
        for (let info = this.cameraPackets.head(); info !== null; info = this.cameraPackets.next()) {
            const localX = info.camX - CoordGrid.zoneOrigin(this.originX);
            const localZ = info.camZ - CoordGrid.zoneOrigin(this.originZ);
            if (info.type === 1) {
                this.write(rsbuf.camMoveTo(this.pid, localX, localZ, info.height, info.rotationSpeed, info.rotationMultiplier));
            } else if (info.type === 0) {
                this.write(rsbuf.camLookAt(this.pid, localX, localZ, info.height, info.rotationSpeed, info.rotationMultiplier));
            }
            info.unlink();
        }

        // map zone changed
        const mapZone = CoordGrid.packCoord(0, (this.x >> 6) << 6, (this.z >> 6) << 6);
        if (this.lastMapZone !== mapZone) {
            // map zone triggers
            if (this.lastMapZone !== -1) {
                const { x, z } = CoordGrid.unpackCoord(this.lastMapZone);
                this.triggerMapzoneExit(x, z);
            }

            this.triggerMapzone((this.x >> 6) << 6, (this.z >> 6) << 6);
            this.lastMapZone = mapZone;
        }

        // zone changed
        const zone = CoordGrid.packCoord(this.level, (this.x >> 3) << 3, (this.z >> 3) << 3);
        if (this.lastZone !== zone) {
            this.buildArea.rebuildZones();

            // zone triggers
            const lastWasMulti = World.gameMap.isMulti(this.lastZone);
            const nowIsMulti = World.gameMap.isMulti(zone);
            if (lastWasMulti != nowIsMulti) {
                this.write(rsbuf.setMultiway(this.pid, nowIsMulti));
            }

            if (this.lastZone !== -1) {
                const { level, x, z } = CoordGrid.unpackCoord(this.lastZone);
                this.triggerZoneExit(level, x, z);
            }

            this.triggerZone(this.level, (this.x >> 3) << 3, (this.z >> 3) << 3);
            this.lastZone = zone;
        }
    }

    updatePlayers() {
        this.write(rsbuf.playerInfo(this.client.out.pos, this.pid, Math.abs(this.lastTickX - this.x), Math.abs(this.lastTickZ - this.z), this.lastLevel !== this.level));
    }

    updateNpcs() {
        this.write(rsbuf.npcInfo(this.client.out.pos, this.pid, Math.abs(this.lastTickX - this.x), Math.abs(this.lastTickZ - this.z), this.lastLevel !== this.level));
    }

    updateZones() {
        const loadedZones: Set<number> = this.buildArea.loadedZones;
        const activeZones: Set<number> = this.buildArea.activeZones;

        // unload any zones that are no longer active
        for (const zoneIndex of loadedZones) {
            if (!activeZones.has(zoneIndex)) {
                loadedZones.delete(zoneIndex);
            }
        }

        // update active zones
        for (const zoneIndex of activeZones) {
            const zone: Zone = World.gameMap.getZoneIndex(zoneIndex);
            if (!loadedZones.has(zone.index)) {
                zone.writeFullFollows(this);
            }
            zone.writePartialEncloses(this);
            zone.writePartialFollows(this);
            loadedZones.add(zone.index);
        }
    }

    updateStats() {
        for (let i = 0; i < this.stats.length; i++) {
            if (this.stats[i] !== this.lastStats[i] || this.levels[i] !== this.lastLevels[i]) {
                this.write(rsbuf.updateStat(this.pid, i, this.stats[i], this.levels[i]));
                this.lastStats[i] = this.stats[i];
                this.lastLevels[i] = this.levels[i];
            }
        }

        if (Math.floor(this.runenergy) / 100 !== Math.floor(this.lastRunEnergy) / 100) {
            this.write(rsbuf.updateRunEnergy(this.pid, this.runenergy));
            this.lastRunEnergy = this.runenergy;
        }
    }

    // todo: partial updates
    updateInvs() {
        let runWeightChanged = false;
        let firstSeen = false;

        for (let i = 0; i < this.invListeners.length; i++) {
            const listener = this.invListeners[i];
            if (!listener) {
                continue;
            }

            if (listener.source === -1) {
                // world inventory
                const inv = World.getInventory(listener.type);
                if (!inv) {
                    continue;
                }

                if (inv.update || listener.firstSeen) {
                    const comType = Component.get(listener.com);
                    this.write(rsbuf.updateInvFull(this.pid, Math.min(inv.capacity, comType.width * comType.height), listener.com, inv.packed()));
                    listener.firstSeen = false;
                }
            } else {
                // player inventory
                const player = World.getPlayerByUid(listener.source);
                if (!player) {
                    continue;
                }

                const inv = player.getInventory(listener.type);
                if (!inv) {
                    continue;
                }

                if (inv.update || listener.firstSeen) {
                    const comType = Component.get(listener.com);
                    this.write(rsbuf.updateInvFull(this.pid, Math.min(inv.capacity, comType.width * comType.height), listener.com, inv.packed()));
                    if (listener.firstSeen) {
                        firstSeen = true;
                    }
                    listener.firstSeen = false;

                    const invType = InvType.get(listener.type);
                    if (invType.runweight) {
                        runWeightChanged = true;
                    }
                }
            }
        }

        if (runWeightChanged) {
            const current = this.runweight;
            this.calculateRunWeight();
            runWeightChanged = current !== this.runweight;
        }

        if (runWeightChanged || firstSeen) {
            this.write(rsbuf.updateRunWeight(this.pid, this.runweight / 1000 | 0));
        }
    }
}

export function isClientConnected(player: Player): player is NetworkPlayer {
    return player instanceof NetworkPlayer && !(player.client instanceof NullClientSocket);
}

export function isBufferFull(player: Player): boolean {
    if (!isClientConnected(player)) {
        return false;
    }

    let total = 0;
    total += 1; // TODO

    // for (const message of player.buffer) {
    //     const encoder: MessageEncoder<OutgoingMessage> | undefined = ServerProtRepository.getEncoder(message);
    //     if (!encoder) {
    //         return true;
    //     }
    //
    //     const prot: ServerProt = encoder.prot;
    //     total += 1 + (prot.length === -1 ? 1 : prot.length === -2 ? 2 : 0) + encoder.test(message);
    // }

    return total >= 5000;
}
