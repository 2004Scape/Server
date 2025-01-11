import fs from 'fs';

import Packet from '#/io/Packet.js';

import { ConfigType } from '#/cache/config/ConfigType.js';
import Jagfile from '#/io/Jagfile.js';

export default class SpotanimType extends ConfigType {
    private static configNames = new Map();
    private static configs: SpotanimType[] = [];

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/spotanim.dat`)) {
            return;
        }

        const server = Packet.load(`${dir}/server/spotanim.dat`);
        const jag = Jagfile.load(`${dir}/client/config`);
        this.parse(server, jag);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/spotanim.dat`);
        if (!file.ok) {
            return;
        }

        const [server, jag] = await Promise.all([file.arrayBuffer(), Jagfile.loadAsync(`${dir}/client/config`)]);
        this.parse(new Packet(new Uint8Array(server)), jag);
    }

    static parse(server: Packet, jag: Jagfile) {
        SpotanimType.configNames = new Map();
        SpotanimType.configs = [];

        const count = server.g2();

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

    static get count() {
        return this.configs.length;
    }

    // ----

    model: number = 0;
    anim: number = -1;
    hasalpha: boolean = false;
    recol_s: Uint16Array = new Uint16Array(6);
    recol_d: Uint16Array = new Uint16Array(6);
    resizeh: number = 128;
    resizev: number = 128;
    orientation: number = 0;
    ambient: number = 0;
    contrast: number = 0;

    decode(code: number, dat: Packet) {
        if (code === 1) {
            this.model = dat.g2();
        } else if (code === 2) {
            this.anim = dat.g2();
        } else if (code === 3) {
            this.hasalpha = true;
        } else if (code === 4) {
            this.resizeh = dat.g2();
        } else if (code === 5) {
            this.resizev = dat.g2();
        } else if (code === 6) {
            this.orientation = dat.g2();
        } else if (code === 7) {
            this.ambient = dat.g1();
        } else if (code === 8) {
            this.contrast = dat.g1();
        } else if (code >= 40 && code < 50) {
            this.recol_s[code - 40] = dat.g2();
        } else if (code >= 50 && code < 60) {
            this.recol_d[code - 50] = dat.g2();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized spotanim config code: ${code}`);
        }
    }
}
