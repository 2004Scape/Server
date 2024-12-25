import ScriptVarType from '#/cache/config/ScriptVarType.js';

import { ConfigValue, ConfigLine, PackedData, isConfigBoolean, getConfigBoolean } from '#tools/pack/config/PackShared.js';
import { lookupParamValue } from '#tools/pack/config/ParamConfig.js';
import { DbTablePack } from '#/util/PackFile.js';

function parseCsv(str: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);

        if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else {
            current += char;
        }
    }

    result.push(current);
    return result;
}

export function parseDbTableConfig(key: string, value: string): ConfigValue | null | undefined {
    const stringKeys: string[] = [];
    const numberKeys: string[] = [];
    const booleanKeys: string[] = [];

    if (stringKeys.includes(key)) {
        if (value.length > 1000) {
            // arbitrary limit
            return null;
        }

        return value;
    } else if (numberKeys.includes(key)) {
        let number;
        if (value.startsWith('0x')) {
            // check that the string contains only hexadecimal characters, and minus sign if applicable
            if (!/^-?[0-9a-fA-F]+$/.test(value.slice(2))) {
                return null;
            }

            number = parseInt(value, 16);
        } else {
            // check that the string contains only numeric characters, and minus sign if applicable
            if (!/^-?[0-9]+$/.test(value)) {
                return null;
            }

            number = parseInt(value);
        }

        if (Number.isNaN(number)) {
            return null;
        }

        return number;
    } else if (booleanKeys.includes(key)) {
        if (!isConfigBoolean(value)) {
            return null;
        }

        return getConfigBoolean(value);
    } else if (key === 'column') {
        return value;
    } else if (key === 'default') {
        return value;
    } else {
        return undefined;
    }
}

export function packDbTableConfigs(configs: Map<string, ConfigLine[]>) {
    const client: PackedData = new PackedData(DbTablePack.size);
    const server: PackedData = new PackedData(DbTablePack.size);

    for (let i = 0; i < DbTablePack.size; i++) {
        const debugname = DbTablePack.getById(i);
        const config = configs.get(debugname)!;

        const columns = [];
        const defaults = [];

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'column') {
                // columns have a few rules:
                // 1) the format is column=name,type,PROPERTIES
                // 2) a column can have multiple types, comma separated
                // 3) if a column has multiple types it must have LIST as one of its properties
                // 4) default values cannot be assigned to REQUIRED columns
                // 5) if a column is INDEXED, it must be REQUIRED too
                const column = parseCsv(value as string);
                const name = column.shift();
                const types = [];
                const properties = [];

                for (let j = 0; j < column.length; j++) {
                    const part = column[j];

                    if (part.toUpperCase() === part) {
                        properties.push(part);
                    } else {
                        types.push(ScriptVarType.getTypeChar(part));
                    }
                }

                columns.push({ name, types, properties });
            } else if (key === 'default') {
                // default values have a few rules:
                // 1) the format is default=column,value,value,value,value,value
                // 2) the first value is the column name
                // 3) the rest of the values are the default values for that column, in order
                // 4) if a string has a comma in it, it must be quoted
                const parts = parseCsv(value as string);
                const column = parts.shift();
                const columnIndex = columns.findIndex(col => col.name === column);
                const values = parts;

                defaults[columnIndex] = values;
            }
        }

        if (columns.length) {
            server.p1(1);

            server.p1(columns.length); // total columns (not every one has to be encoded)
            for (let i = 0; i < columns.length; i++) {
                const column = columns[i];

                let flags = i;
                if (defaults[i]) {
                    flags |= 0x80;
                }
                server.p1(flags);

                server.p1(column.types.length);
                for (let j = 0; j < column.types.length; j++) {
                    server.p1(column.types[j] as number);
                }

                if (flags & 0x80) {
                    server.p1(1); // # of fields

                    for (let j = 0; j < column.types.length; j++) {
                        const type = column.types[j];
                        const value = lookupParamValue(type as number, defaults[i][j]);

                        if (type === ScriptVarType.STRING) {
                            server.pjstr(value as string);
                        } else {
                            server.p4(value as number);
                        }
                    }
                }
            }

            server.p1(255); // end of column list
        }

        server.p1(250);
        server.pjstr(debugname);

        if (columns.length) {
            server.p1(251);

            server.p1(columns.length);
            for (let i = 0; i < columns.length; i++) {
                server.pjstr(columns[i].name as string);
            }
        }

        client.next();
        server.next();
    }

    return { client, server };
}
