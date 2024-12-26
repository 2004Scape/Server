import fs from 'fs';

import Packet from '#/io/Packet.js';

import { ConfigType } from '#/cache/config/ConfigType.js';

export default class InvType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: InvType[] = [];

    static SCOPE_TEMP = 0;
    static SCOPE_PERM = 1;
    static SCOPE_SHARED = 2;

    // commonly referenced in-engine
    static INV = -1;
    static WORN = -1;

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/inv.dat`)) {
            return;
        }

        const dat = Packet.load(`${dir}/server/inv.dat`);
        this.parse(dat);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/inv.dat`);
        if (!file.ok) {
            return;
        }

        const dat = new Packet(new Uint8Array(await file.arrayBuffer()));
        this.parse(dat);
    }

    static parse(dat: Packet) {
        InvType.configNames = new Map();
        InvType.configs = [];

        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new InvType(id);
            config.decodeType(dat);

            InvType.configs[id] = config;

            if (config.debugname) {
                InvType.configNames.set(config.debugname, id);
            }
        }

        InvType.INV = InvType.getId('inv');
        InvType.WORN = InvType.getId('worn');
    }

    static get(id: number): InvType {
        return InvType.configs[id];
    }

    static getId(name: string): number {
        return InvType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): InvType | null {
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

    scope = 0;
    size = 1;
    stackall = false;
    restock = false;
    allstock = false;
    stockobj: Uint16Array | null = null;
    stockcount: Uint16Array | null = null;
    stockrate: Int32Array | null = null;
    protect = true;
    runweight = false; // inv contributes to weight
    dummyinv = false; // inv only accepts objs with dummyitem=inv_only

    decode(code: number, dat: Packet) {
        if (code === 1) {
            this.scope = dat.g1();
        } else if (code === 2) {
            this.size = dat.g2();
        } else if (code === 3) {
            this.stackall = true;
        } else if (code === 4) {
            const count = dat.g1();

            this.stockobj = new Uint16Array(count);
            this.stockcount = new Uint16Array(count);
            this.stockrate = new Int32Array(count);

            for (let j = 0; j < count; j++) {
                this.stockobj[j] = dat.g2();
                this.stockcount[j] = dat.g2();
                this.stockrate[j] = dat.g4();
            }
        } else if (code === 5) {
            this.restock = true;
        } else if (code === 6) {
            this.allstock = true;
        } else if (code === 7) {
            this.protect = false;
        } else if (code === 8) {
            this.runweight = true;
        } else if (code === 9) {
            this.dummyinv = true;
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized inv config code: ${code}`);
        }
    }
}
