import fs from 'fs';

import { ConfigType } from '#/cache/config/ConfigType.js';
import { ParamHelper, ParamMap } from '#/cache/config/ParamHelper.js';
import { BlockWalk } from '#/engine/entity/BlockWalk.js';
import { MoveRestrict } from '#/engine/entity/MoveRestrict.js';
import { NpcMode } from '#/engine/entity/NpcMode.js';
import { NpcStat } from '#/engine/entity/NpcStat.js';
import Jagfile from '#/io/Jagfile.js';
import Packet from '#/io/Packet.js';

export default class NpcType extends ConfigType {
    static configNames = new Map();
    static configs: NpcType[] = [];

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/npc.dat`)) {
            return;
        }
        const server = Packet.load(`${dir}/server/npc.dat`);
        const jag = Jagfile.load(`${dir}/client/config`);
        this.parse(server, jag);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/npc.dat`);
        if (!file.ok) {
            return;
        }

        const [server, jag] = await Promise.all([file.arrayBuffer(), Jagfile.loadAsync(`${dir}/client/config`)]);
        this.parse(new Packet(new Uint8Array(server)), jag);
    }

    static parse(server: Packet, jag: Jagfile) {
        NpcType.configNames = new Map();
        NpcType.configs = [];

        const count = server.g2();

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
    models: Uint16Array | null = null;
    heads: Uint16Array | null = null;
    hasanim = false;
    readyanim = -1;
    walkanim = -1;
    walkanim_b = -1;
    walkanim_r = -1;
    walkanim_l = -1;
    hasalpha = false;
    recol_s: Uint16Array | null = null;
    recol_d: Uint16Array | null = null;
    op: (string | null)[] | null = null;
    resizex = -1;
    resizey = -1;
    resizez = -1;
    minimap = true;
    vislevel = -1;
    resizeh = 128;
    resizev = 128;

    // server-side
    regenRate = 100;
    category = -1;
    wanderrange = 5;
    maxrange = 7;
    huntrange = 0;
    timer = -1;
    respawnrate = 100; // default to 1-minute
    stats = [1, 1, 1, 1, 1, 1];
    moverestrict = MoveRestrict.NORMAL;
    attackrange = 0;
    huntmode = -1;
    defaultmode = NpcMode.WANDER;
    members = false;
    blockwalk = BlockWalk.NPC;
    params: ParamMap = new Map();
    patrolCoord: number[] = [];
    patrolDelay: number[] = [];
    givechase = true;

    decode(code: number, dat: Packet): void {
        if (code === 1) {
            const count = dat.g1();
            this.models = new Uint16Array(count);

            for (let i = 0; i < count; i++) {
                this.models[i] = dat.g2();
            }
        } else if (code === 2) {
            this.name = dat.gjstr();
        } else if (code === 3) {
            this.desc = dat.gjstr();
        } else if (code === 12) {
            this.size = dat.g1();
        } else if (code === 13) {
            this.readyanim = dat.g2();
        } else if (code === 14) {
            this.walkanim = dat.g2();
        } else if (code === 16) {
            this.hasanim = true;
        } else if (code === 17) {
            this.walkanim = dat.g2();
            this.walkanim_b = dat.g2();
            this.walkanim_r = dat.g2();
            this.walkanim_l = dat.g2();
        } else if (code === 18) {
            this.category = dat.g2();
        } else if (code >= 30 && code < 40) {
            if (!this.op) {
                this.op = new Array(5).fill(null);
            }

            this.op[code - 30] = dat.gjstr();
        } else if (code === 40) {
            const count = dat.g1();
            this.recol_s = new Uint16Array(count);
            this.recol_d = new Uint16Array(count);

            for (let i = 0; i < count; i++) {
                this.recol_s[i] = dat.g2();
                this.recol_d[i] = dat.g2();
            }
        } else if (code === 60) {
            const count = dat.g1();
            this.heads = new Uint16Array(count);

            for (let i = 0; i < count; i++) {
                this.heads[i] = dat.g2();
            }
        } else if (code === 74) {
            this.stats[NpcStat.ATTACK] = dat.g2();
        } else if (code === 75) {
            this.stats[NpcStat.DEFENCE] = dat.g2();
        } else if (code === 76) {
            this.stats[NpcStat.STRENGTH] = dat.g2();
        } else if (code === 77) {
            this.stats[NpcStat.HITPOINTS] = dat.g2();
        } else if (code === 78) {
            this.stats[NpcStat.RANGED] = dat.g2();
        } else if (code === 79) {
            this.stats[NpcStat.MAGIC] = dat.g2();
        } else if (code === 90) {
            this.resizex = dat.g2();
        } else if (code === 91) {
            this.resizey = dat.g2();
        } else if (code === 92) {
            this.resizez = dat.g2();
        } else if (code === 93) {
            this.minimap = false;
        } else if (code === 95) {
            this.vislevel = dat.g2();
        } else if (code === 97) {
            this.resizeh = dat.g2();
        } else if (code === 98) {
            this.resizev = dat.g2();
        } else if (code === 200) {
            this.wanderrange = dat.g1();
        } else if (code === 201) {
            this.maxrange = dat.g1();
        } else if (code === 202) {
            this.huntrange = dat.g1();
        } else if (code === 203) {
            this.timer = dat.g2();
        } else if (code === 204) {
            this.respawnrate = dat.g2();
        } else if (code === 206) {
            this.moverestrict = dat.g1();
        } else if (code == 207) {
            this.attackrange = dat.g1();
        } else if (code === 208) {
            this.blockwalk = dat.g1();
        } else if (code === 209) {
            this.huntmode = dat.g1();
        } else if (code === 210) {
            this.defaultmode = dat.g1();
        } else if (code === 211) {
            this.members = true;
        } else if (code === 212) {
            const count = dat.g1();

            this.patrolCoord = new Array(count);
            this.patrolDelay = new Array(count);

            for (let j = 0; j < count; j++) {
                this.patrolCoord[j] = dat.g4();
                this.patrolDelay[j] = dat.g1();
            }
        } else if (code === 213) {
            this.givechase = false;
        } else if (code === 249) {
            this.params = ParamHelper.decodeParams(dat);
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized npc config code: ${code}`);
        }
    }
}
