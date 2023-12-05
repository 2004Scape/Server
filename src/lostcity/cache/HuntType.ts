import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import { ConfigType } from '#lostcity/cache/ConfigType.js';

import HuntCheckNotTooStrong from '#lostcity/engine/hunt/HuntCheckNotTooStrong.js';
import HuntModeType from '#lostcity/engine/hunt/HuntModeType.js';
import HuntNobodyNear from '#lostcity/engine/hunt/HuntNobodyNear.js';
import HuntVis from '#lostcity/engine/hunt/HuntVis.js';

import NpcMode from '#lostcity/entity/NpcMode.js';

export default class HuntType extends ConfigType {
    private static configNames: Map<string, number> = new Map();
    private static configs: HuntType[] = [];

    static load(dir: string) {
        HuntType.configNames = new Map();
        HuntType.configs = [];

        if (!fs.existsSync(`${dir}/hunt.dat`)) {
            console.log('Warning: No hunt.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/hunt.dat`);
        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new HuntType(id);
            config.decodeType(dat);

            HuntType.configs[id] = config;

            if (config.debugname) {
                HuntType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): HuntType {
        return HuntType.configs[id];
    }

    static getId(name: string): number {
        return HuntType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): HuntType | null {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----
    type: HuntModeType = HuntModeType.OFF;
    checkVis: HuntVis = HuntVis.OFF;
    checkNotTooString: HuntCheckNotTooStrong = HuntCheckNotTooStrong.OFF;
    checkNotBusy: boolean = false;
    findKeepHunting: boolean = false;
    findNewMode: NpcMode = NpcMode.NONE;
    nobodyNear: HuntNobodyNear = HuntNobodyNear.OFF;

    decode(opcode: number, packet: Packet): void {
        if (opcode === 1) {
            this.type = packet.g1();
        } else if (opcode == 2) {
            this.checkVis = packet.g1();
        } else if (opcode == 3) {
            this.checkNotTooString = packet.g1();
        } else if (opcode == 4) {
            this.checkNotBusy = packet.gbool();
        } else if (opcode == 5) {
            this.findKeepHunting = packet.gbool();
        } else if (opcode == 6) {
            this.findNewMode = packet.g1();
        } else if (opcode == 7) {
            this.nobodyNear = packet.g1();
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            throw new Error(`Unrecognized hunt config code: ${opcode}`);
        }
    }
}
