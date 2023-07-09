import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import ParamType from './ParamType.js';
import { ConfigType } from "#lostcity/cache/ConfigType.js";

export default class VarPlayerType extends ConfigType {
    static SCOPE_TEMP = 0;
    static SCOPE_PERM = 1;

    private static configNames = new Map<string, number>();
    private static configs: VarPlayerType[] = [];

    static load(dir: string) {
        VarPlayerType.configNames = new Map();
        VarPlayerType.configs = [];

        if (!fs.existsSync(`${dir}/varp.dat`)) {
            console.log('Warning: No varp.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/varp.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new VarPlayerType(id);
            config.decodeType(dat);

            VarPlayerType.configs[id] = config;

            if (config.debugname) {
                VarPlayerType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return VarPlayerType.configs[id];
    }

    static getId(name: string) {
        return VarPlayerType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    static get count() {
        return VarPlayerType.configs.length;
    }

    // ----

    clientcode = 0;

    // server-side
    scope = VarPlayerType.SCOPE_TEMP;
    type = ParamType.INT;
    protect = true;
    transmit = false;

    decode(opcode: number, packet: Packet) {
        switch (opcode) {
            case 1:
                this.scope = packet.g1();
                break;
            case 2:
                this.type = packet.g1();
                break;
            case 4:
                this.protect = false;
                break;
            case 5:
                this.clientcode = packet.g2();
                break;
            case 6:
                this.transmit = true;
                break;
            case 250:
                this.debugname = packet.gjstr();
                break;
            default:
                console.error(`Unrecognized varp config code: ${opcode}`);
                break;
        }
    }
}
