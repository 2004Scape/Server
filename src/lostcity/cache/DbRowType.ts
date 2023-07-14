import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import { ConfigType } from "#lostcity/cache/ConfigType.js";
import ScriptVarType from './ScriptVarType.js';

export default class DbRowType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: DbRowType[] = [];

    static load(dir: string) {
        DbRowType.configNames = new Map();
        DbRowType.configs = [];

        if (!fs.existsSync(`${dir}/dbrow.dat`)) {
            console.log('Warning: No dbrow.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/dbrow.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new DbRowType(id);
            config.decodeType(dat);

            DbRowType.configs[id] = config;

            if (config.debugname) {
                DbRowType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return DbRowType.configs[id];
    }

    static getId(name: string) {
        return DbRowType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    static decodeValues(packet: Packet, types: any[]) {
        let fieldCount = packet.g1();
        let values = new Array(fieldCount * types.length);

        for (let fieldId = 0; fieldId < fieldCount; fieldId++) {
            for (let typeId = 0; typeId < types.length; typeId++) {
                let type = types[typeId];
                let index = typeId + (fieldId * types.length);

                if (type === ScriptVarType.STRING) {
                    values[index] = packet.gjstr();
                } else {
                    values[index] = packet.g4s();
                }
            }
        }

        return values;
    }

    static getInTable(tableId: number) {
        return DbRowType.configs.filter(config => config.tableId === tableId);
    }

    // ----

    tableId: number;
    types: any[][] = [];
    columnValues: any[][] = [];

    decode(opcode: number, packet: Packet) {
        if (opcode === 3) {
            let numColumns = packet.g1();
            this.types = new Array(numColumns);
            this.columnValues = new Array(numColumns);

            for (let columnId = packet.g1(); columnId != 255; columnId = packet.g1()) {
                let columnTypes = new Array(packet.g1());

                for (let i = 0; i < columnTypes.length; i++) {
                    columnTypes[i] = packet.g1();
                }

                this.types[columnId] = columnTypes;
                this.columnValues[columnId] = DbRowType.decodeValues(packet, columnTypes);
            }
        } else if (opcode === 4) {
            this.tableId = packet.g2();
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            console.error(`Unrecognized dbtable config code: ${opcode}`);
        }
    }
}
