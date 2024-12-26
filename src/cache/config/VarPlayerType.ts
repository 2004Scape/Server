import fs from 'fs';

import Packet from '#/io/Packet.js';

import { ConfigType } from '#/cache/config/ConfigType.js';
import ScriptVarType from '#/cache/config/ScriptVarType.js';
import Jagfile from '#/io/Jagfile.js';
import { printError } from '#/util/Logger.js';

export default class VarPlayerType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: VarPlayerType[] = [];

    static SCOPE_TEMP = 0;
    static SCOPE_PERM = 1;

    // commonly referenced in-engine
    static PLAYER_RUN = -1;
    static TEMP_RUN = -1;
    static LASTCOMBAT = -1;

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/varp.dat`)) {
            return;
        }

        const server = Packet.load(`${dir}/server/varp.dat`);
        const jag = Jagfile.load(`${dir}/client/config`);
        this.parse(server, jag);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/varp.dat`);
        if (!file.ok) {
            return;
        }

        const [server, jag] = await Promise.all([file.arrayBuffer(), Jagfile.loadAsync(`${dir}/client/config`)]);
        this.parse(new Packet(new Uint8Array(server)), jag);
    }

    static parse(server: Packet, jag: Jagfile) {
        VarPlayerType.configNames = new Map();
        VarPlayerType.configs = [];

        const count = server.g2();

        const client = jag.read('varp.dat')!;
        client.pos = 2;

        for (let id = 0; id < count; id++) {
            const config = new VarPlayerType(id);
            config.decodeType(server);
            config.decodeType(client);

            VarPlayerType.configs[id] = config;

            if (config.debugname) {
                VarPlayerType.configNames.set(config.debugname, id);
            }
        }

        VarPlayerType.PLAYER_RUN = VarPlayerType.getId('player_run');
        VarPlayerType.TEMP_RUN = VarPlayerType.getId('temp_run');
        VarPlayerType.LASTCOMBAT = VarPlayerType.getId('lastcombat');
    }

    static get(id: number): VarPlayerType {
        return VarPlayerType.configs[id];
    }

    static getId(name: string): number {
        return VarPlayerType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): VarPlayerType | null {
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

    clientcode = 0;

    // server-side
    scope = VarPlayerType.SCOPE_TEMP;
    type = ScriptVarType.INT;
    protect = true;
    transmit = false;

    decode(code: number, dat: Packet) {
        if (code === 1) {
            this.scope = dat.g1();
        } else if (code === 2) {
            this.type = dat.g1();
        } else if (code === 4) {
            this.protect = false;
        } else if (code === 5) {
            this.clientcode = dat.g2();
        } else if (code === 6) {
            this.transmit = true;
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            printError(`Unrecognized varp config code: ${code}`);
        }
    }
}
