import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import { ConfigType } from "#lostcity/cache/ConfigType.js";
import { ParamHelper, ParamHolder, ParamMap } from "#lostcity/cache/ParamHelper.js";

export default class StructType extends ConfigType implements ParamHolder {
    private static configNames = new Map<string, number>();
    private static configs: StructType[] = [];

    static load(dir: string) {
        StructType.configNames = new Map();
        StructType.configs = [];

        if (!fs.existsSync(`${dir}/struct.dat`)) {
            console.log('Warning: No struct.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/struct.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new StructType(id);
            config.decodeType(dat);

            StructType.configs[id] = config;

            if (config.debugname) {
                StructType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return StructType.configs[id];
    }

    static getId(name: string): number {
        return StructType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    params: ParamMap | null = null;

    decode(opcode: number, packet: Packet) {
        switch (opcode) {
            case 249:
                this.params = ParamHelper.decodeParams(packet);
                break;
            case 250:
                this.debugname = packet.gjstr();
                break;
            default:
                throw new Error(`Unrecognized struct config code: ${opcode}`);
        }
    }
}
