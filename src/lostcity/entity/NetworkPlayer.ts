import 'dotenv/config';
import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import Loc from '#lostcity/entity/Loc.js';
import Obj from '#lostcity/entity/Obj.js';
import { Position } from '#lostcity/entity/Position.js';

import ServerProt from '#lostcity/server/ServerProt.js';

import World from '#lostcity/engine/World.js';

import Environment from '#lostcity/util/Environment.js';

import { findPath } from '@2004scape/rsmod-pathfinder';
import Player from '#lostcity/entity/Player.js';
import ClientSocket from '#lostcity/server/ClientSocket.js';

import ClientProtRepository from '#lostcity/network/225/incoming/prot/ClientProtRepository.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';

export class NetworkPlayer extends Player {
    client: ClientSocket | null = null;
    userPath: number[] = [];
    opcalled: boolean = false;

    constructor(username: string, username37: bigint, client: ClientSocket) {
        super(username, username37);

        this.client = client;
        this.client.player = this;
    }

    decodeIn() {
        // this.lastResponse = World.currentTick; // use to keep headless players in the world
        if (this.client === null || this.client.inOffset < 1) {
            return;
        }

        let offset = 0;
        this.lastResponse = World.currentTick;

        this.userPath = [];
        this.opcalled = false;

        while (this.client.inOffset > offset) {
            const packetType = ClientProt.byId[this.client.in[offset++]];
            let length = packetType.length;
            if (length == -1) {
                length = this.client.in[offset++];
            } else if (length == -2) {
                length = (this.client.in[offset++] << 8) | this.client.in[offset++];
            }
            const data = new Packet(this.client.in.slice(offset, offset + length));
            offset += length;

            const decoder = ClientProtRepository.getDecoder(packetType);
            if (decoder) {
                const message = decoder.decode(data);
                const handler = ClientProtRepository.getHandler(packetType);

                if (handler) {
                    handler.handle(message, this);
                }
            }
        }

        this.client?.reset();

        if (this.userPath.length > 0 || this.opcalled) {
            if (this.delayed()) {
                this.unsetMapFlag();
                return;
            }

            if (!this.target || this.target instanceof Loc || this.target instanceof Obj) {
                this.faceEntity = -1;
                this.mask |= Player.FACE_ENTITY;
            }

            console.log(this.opcalled);
            console.log(this.target !== null);

            if (this.opcalled && (this.userPath.length === 0 || !Environment.CLIENT_PATHFINDER)) {
                this.pathToTarget();
                return;
            }

            if (Environment.CLIENT_PATHFINDER) {
                this.queueWaypoints(this.userPath);
            } else {
                const { x, z } = Position.unpackCoord(this.userPath[0]);
                this.queueWaypoints(findPath(this.level, this.x, this.z, x, z));
            }
        }
    }

    encodeOut() {
        if (!this.client) {
            return;
        }

        if (this.modalTop !== this.lastModalTop || this.modalBottom !== this.lastModalBottom || this.modalSidebar !== this.lastModalSidebar || this.refreshModalClose) {
            if (this.refreshModalClose) {
                this.writeLowPriority(ServerProt.IF_CLOSE);
            }
            this.refreshModalClose = false;

            this.lastModalTop = this.modalTop;
            this.lastModalBottom = this.modalBottom;
            this.lastModalSidebar = this.modalSidebar;
        }

        if (this.refreshModal) {
            if ((this.modalState & 1) === 1 && (this.modalState & 4) === 4) {
                this.writeLowPriority(ServerProt.IF_OPENMAINSIDEMODAL, this.modalTop, this.modalSidebar);
            } else if ((this.modalState & 1) === 1) {
                this.writeLowPriority(ServerProt.IF_OPENMAINMODAL, this.modalTop);
            } else if ((this.modalState & 2) === 2) {
                this.writeLowPriority(ServerProt.IF_OPENCHATMODAL, this.modalBottom);
            } else if ((this.modalState & 4) === 4) {
                this.writeLowPriority(ServerProt.IF_OPENSIDEMODAL, this.modalSidebar);
            }

            this.refreshModal = false;
        }

        for (let packet: Packet | null = this.highPriorityOut.head(); packet !== null; packet = this.highPriorityOut.next()) {
            if (this.client.encryptor) {
                packet.data[0] = (packet.data[0] + this.client.encryptor.nextInt()) & 0xff;
            }
            World.lastCycleBandwidth[1] += packet.pos;

            this.client.write(packet);
            packet.release();
            packet.uncache();
        }

        for (let packet: Packet | null = this.lowPriorityOut.head(); packet !== null; packet = this.lowPriorityOut.next()) {
            if (this.client.encryptor) {
                packet.data[0] = (packet.data[0] + this.client.encryptor.nextInt()) & 0xff;
            }
            World.lastCycleBandwidth[1] += packet.pos;

            this.client.write(packet);
            packet.release();
            packet.uncache();
        }

        this.client.flush();
    }

    writeImmediately(packet: Packet) {
        if (!this.client) {
            return;
        }

        if (this.client.encryptor) {
            packet.data[0] = (packet.data[0] + this.client.encryptor.nextInt()) & 0xff;
        }

        this.client.write(packet);
        this.client.flush();
    }

    override logout() {
        const out = new Packet(new Uint8Array(1));
        out.p1(ServerProt.LOGOUT.id);

        this.writeImmediately(out);
    }

    override terminate() {
        this.client?.terminate();
        this.client = null;
    }

    override playerLog(message: string, ...args: string[]): void {
        if (args.length > 0) {
            fs.appendFileSync(`data/players/${this.username}.log`, `[${new Date().toISOString().split('T')[0]} ${this.client?.remoteAddress}]: ${message} ${args.join(' ')}\n`);
        } else {
            fs.appendFileSync(`data/players/${this.username}.log`, `[${new Date().toISOString().split('T')[0]} ${this.client?.remoteAddress}]: ${message}\n`);
        }
    }
}

export function isNetworkPlayer(player: Player): player is NetworkPlayer {
    return (player as NetworkPlayer).client !== null && (player as NetworkPlayer).client !== undefined;
}
