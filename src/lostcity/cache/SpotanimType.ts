import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import { ConfigType } from '#lostcity/cache/ConfigType.js';
import Jagfile from '#jagex2/io/Jagfile.js';

export default class SpotanimType extends ConfigType {
    private static configNames = new Map();
    private static configs: SpotanimType[] = [];

    static load(dir: string) {
        SpotanimType.configNames = new Map();
        SpotanimType.configs = [];

        if (!fs.existsSync(`${dir}/server/spotanim.dat`)) {
            console.log('Warning: No spotanim.dat found.');
            return;
        }

        const server = Packet.load(`${dir}/server/spotanim.dat`);
        const count = server.g2();

        const jag = Jagfile.load(`${dir}/client/config`);
        const client = jag.read('spotanim.dat')!;
        client.pos = 2;

        for (let id = 0; id < count; id++) {
            const config = new SpotanimType(id);
            config.decodeType(server);
            config.decodeType(client);

            SpotanimType.configs[id] = config;

            if (config.debugname) {
                SpotanimType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): SpotanimType {
        return SpotanimType.configs[id];
    }

    static getId(name: string): number {
        return SpotanimType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): SpotanimType | null {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    model: number = 0;
    anim: number = -1;
    hasalpha: boolean = false;
    recol_s: Int32Array = new Int32Array(10);
    recol_d: Int32Array = new Int32Array(10);
    resizeh: number = 128;
    resizev: number = 128;
    orientation: number = 0;
    ambient: number = 0;
    contrast: number = 0;

    decode(opcode: number, packet: Packet) {
        if (opcode === 1) {
            this.model = packet.g2();
        } else if (opcode === 2) {
            this.anim = packet.g2();
        } else if (opcode === 3) {
            this.hasalpha = true;
        } else if (opcode === 4) {
            this.resizeh = packet.g2();
        } else if (opcode === 5) {
            this.resizev = packet.g2();
        } else if (opcode === 6) {
            this.orientation = packet.g2();
        } else if (opcode === 7) {
            this.ambient = packet.g1();
        } else if (opcode === 8) {
            this.contrast = packet.g1();
        } else if (opcode >= 40 && opcode < 50) {
            this.recol_s[opcode - 40] = packet.g2();
        } else if (opcode >= 50 && opcode < 60) {
            this.recol_d[opcode - 50] = packet.g2();
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            throw new Error(`Unrecognized spotanim config code: ${opcode}`);
        }
    }
}
