import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import { ConfigType } from '#lostcity/cache/ConfigType.js';
import { ParamHelper, ParamMap } from '#lostcity/cache/ParamHelper.js';

import BlockWalk from '#lostcity/entity/BlockWalk.js';
import MoveRestrict from '#lostcity/entity/MoveRestrict.js';
import NpcMode from '#lostcity/entity/NpcMode.js';
import Jagfile from '#jagex2/io/Jagfile.js';

export default class NpcType extends ConfigType {
    static configNames = new Map();
    static configs: NpcType[] = [];

    static load(dir: string) {
        NpcType.configNames = new Map();
        NpcType.configs = [];

        if (!fs.existsSync(`${dir}/server/npc.dat`)) {
            console.log('Warning: No npc.dat found.');
            return;
        }

        const server = Packet.load(`${dir}/server/npc.dat`);
        const count = server.g2();

        const jag = Jagfile.load(`${dir}/client/config`);
        const client = jag.read('npc.dat')!;
        client.pos = 2;

        for (let id = 0; id < count; id++) {
            const config = new NpcType(id);
            config.decodeType(server);
            config.decodeType(client);

            NpcType.configs[id] = config;

            if (config.debugname) {
                NpcType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): NpcType {
        return NpcType.configs[id];
    }

    static getId(name: string): number {
        return NpcType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): NpcType | null {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    static get count() {
        return this.configs.length;
    }

    // ----
    name: string | null = null;
    desc: string | null = null;
    size = 1;
    models: number[] = [];
    heads: number[] = [];
    hasanim = false;
    readyanim = -1;
    walkanim = -1;
    walkanim_b = -1;
    walkanim_r = -1;
    walkanim_l = -1;
    hasalpha = false;
    recol_s: number[] = [];
    recol_d: number[] = [];
    ops: (string | null)[] = [];
    code90 = -1;
    code91 = -1;
    code92 = -1;
    minimap = true;
    vislevel = -1;
    resizeh = 128;
    resizev = 128;

    // server-side
    category = -1;
    wanderrange = 5;
    maxrange = 10;
    huntrange = 5;
    timer = -1;
    respawnrate = 100; // default to 1-minute
    stats = [1, 1, 1, 1, 1, 1];
    moverestrict = MoveRestrict.NORMAL;
    attackrange = 7;
    huntmode = -1;
    defaultmode = NpcMode.WANDER;
    members = false;
    blockwalk = BlockWalk.NPC;
    params: ParamMap = new Map();
    patrolCoord: number[] = [];
    patrolDelay: number[] = [];
    givechase = true;

    decode(opcode: number, packet: Packet): void {
        if (opcode === 1) {
            const count = packet.g1();

            for (let i = 0; i < count; i++) {
                this.models[i] = packet.g2();
            }
        } else if (opcode === 2) {
            this.name = packet.gjstr();
        } else if (opcode === 3) {
            this.desc = packet.gjstr();
        } else if (opcode === 12) {
            this.size = packet.g1();
        } else if (opcode === 13) {
            this.readyanim = packet.g2();
        } else if (opcode === 14) {
            this.walkanim = packet.g2();
        } else if (opcode === 16) {
            this.hasanim = true;
        } else if (opcode === 17) {
            this.walkanim = packet.g2();
            this.walkanim_b = packet.g2();
            this.walkanim_r = packet.g2();
            this.walkanim_l = packet.g2();
        } else if (opcode === 18) {
            this.category = packet.g2();
        } else if (opcode >= 30 && opcode < 40) {
            this.ops[opcode - 30] = packet.gjstr();

            if (this.ops[opcode - 30] === 'hidden') {
                this.ops[opcode - 30] = null;
            }
        } else if (opcode === 40) {
            const count = packet.g1();

            for (let i = 0; i < count; i++) {
                this.recol_s[i] = packet.g2();
                this.recol_d[i] = packet.g2();
            }
        } else if (opcode === 60) {
            const count = packet.g1();

            for (let i = 0; i < count; i++) {
                this.heads[i] = packet.g2();
            }
        } else if (opcode === 90) {
            this.code90 = packet.g2();
        } else if (opcode === 91) {
            this.code91 = packet.g2();
        } else if (opcode === 92) {
            this.code92 = packet.g2();
        } else if (opcode === 93) {
            this.minimap = false;
        } else if (opcode === 95) {
            this.vislevel = packet.g2();
        } else if (opcode === 97) {
            this.resizeh = packet.g2();
        } else if (opcode === 98) {
            this.resizev = packet.g2();
        } else if (opcode === 200) {
            this.wanderrange = packet.g1();
        } else if (opcode === 201) {
            this.maxrange = packet.g1();
        } else if (opcode === 202) {
            this.huntrange = packet.g1();
        } else if (opcode === 203) {
            this.timer = packet.g2();
        } else if (opcode === 204) {
            this.respawnrate = packet.g2();
        } else if (opcode === 205) {
            for (let i = 0; i < 6; i++) {
                this.stats[i] = packet.g2();
            }
        } else if (opcode === 206) {
            this.moverestrict = packet.g1();
        } else if (opcode == 207) {
            this.attackrange = packet.g1();
        } else if (opcode === 208) {
            this.blockwalk = packet.g1();
        } else if (opcode === 209) {
            this.huntmode = packet.g1();
        } else if (opcode === 210) {
            this.defaultmode = packet.g1();
        } else if (opcode === 211) {
            this.members = true;
        } else if (opcode === 212) {
            const count = packet.g1();

            this.patrolCoord = new Array(count);
            this.patrolDelay = new Array(count);

            for (let j = 0; j < count; j++) {
                this.patrolCoord[j] = packet.g4();
                this.patrolDelay[j] = packet.g1();
            }
        } else if (opcode === 213) {
            this.givechase = false;
        } else if (opcode === 249) {
            this.params = ParamHelper.decodeParams(packet);
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            throw new Error(`Unrecognized npc config code: ${opcode} while reading npc ${this.id}`);
        }
    }
}
