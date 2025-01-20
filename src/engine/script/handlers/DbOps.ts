import DbRowType from '#/cache/config/DbRowType.js';
import DbTableType from '#/cache/config/DbTableType.js';
import ScriptVarType from '#/cache/config/ScriptVarType.js';

import ScriptOpcode from '#/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#/engine/script/ScriptRunner.js';

import {check, DbRowTypeValid, DbTableTypeValid} from '#/engine/script/ScriptValidators.js';

const DebugOps: CommandHandlers = {
    [ScriptOpcode.DB_FIND_WITH_COUNT]: () => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.DB_FINDNEXT]: state => {
        if (!state.dbTable) {
            throw new Error('No table selected');
        }

        if (state.dbRow + 1 >= state.dbRowQuery.length) {
            state.pushInt(-1); // null
            return;
        }

        state.dbRow++;

        state.pushInt(check(state.dbRowQuery[state.dbRow], DbRowTypeValid).id);
    },

    [ScriptOpcode.DB_GETFIELD]: state => {
        const [row, tableColumnPacked, listIndex] = state.popInts(3);

        const table = (tableColumnPacked >> 12) & 0xffff;
        const column = (tableColumnPacked >> 4) & 0x7f;
        const _tuple = tableColumnPacked & 0x3f;

        const rowType: DbRowType = check(row, DbRowTypeValid);
        const tableType: DbTableType = check(table, DbTableTypeValid);

        let values: (string | number)[];
        if (rowType.tableId !== table) {
            values = tableType.getDefault(column);
        } else {
            values = rowType.getValue(column, listIndex);
        }

        const valueTypes = tableType.types[column];
        for (let i = 0; i < values.length; i++) {
            if (valueTypes[i] === ScriptVarType.STRING) {
                state.pushString(values[i] as string);
            } else {
                state.pushInt(values[i] as number);
            }
        }
    },

    [ScriptOpcode.DB_GETFIELDCOUNT]: state => {
        const [row, tableColumnPacked] = state.popInts(2);

        const table = (tableColumnPacked >> 12) & 0xffff;
        const column = (tableColumnPacked >> 4) & 0x7f;
        const _tuple = tableColumnPacked & 0x3f;

        const rowType: DbRowType = check(row, DbRowTypeValid);
        const tableType: DbTableType = check(table, DbTableTypeValid);

        if (rowType.tableId !== table) {
            state.pushInt(0);
            return;
        }

        state.pushInt(rowType.columnValues[column].length / tableType.types[column].length);
    },

    [ScriptOpcode.DB_LISTALL_WITH_COUNT]: () => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.DB_GETROWTABLE]: state => {
        state.pushInt(check(state.popInt(), DbRowTypeValid).tableId);
    },

    [ScriptOpcode.DB_FINDBYINDEX]: () => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.DB_FIND_REFINE_WITH_COUNT]: () => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.DB_FIND]: state => {
        const isString = state.popInt() == 2;
        const query = isString ? state.popString() : state.popInt();
        const tableColumnPacked = state.popInt();

        const table = (tableColumnPacked >> 12) & 0xffff;
        const column = (tableColumnPacked >> 4) & 0x7f;
        const _tuple = tableColumnPacked & 0x3f;

        state.dbTable = check(table, DbTableTypeValid);
        state.dbRow = -1;
        state.dbRowQuery = [];

        // search for rows that match the query (table + column + query)
        const rows = DbRowType.getInTable(table);
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            if (row.columnValues[column].includes(query)) {
                state.dbRowQuery.push(row.id);
            }
        }

        state.pushInt(state.dbRowQuery.length);
    },

    [ScriptOpcode.DB_FIND_REFINE]: state => {
        const isString = state.popInt() == 2;
        const query = isString ? state.popString() : state.popInt();
        const tableColumnPacked = state.popInt();

        const table = (tableColumnPacked >> 12) & 0xffff;
        const column = (tableColumnPacked >> 4) & 0x7f;
        const _tuple = tableColumnPacked & 0x3f;

        // ----

        const found = [];
        const rows = DbRowType.getInTable(table);
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            if (row.columnValues[column].includes(query)) {
                found.push(row.id);
            }
        }

        // merge with previous query
        const prevQuery = state.dbRowQuery;
        state.dbRow = -1;
        state.dbRowQuery = [];
        for (let i = 0; i < prevQuery.length; i++) {
            if (found.includes(prevQuery[i])) {
                state.dbRowQuery.push(prevQuery[i]);
            }
        }

        state.pushInt(state.dbRowQuery.length);
    },

    [ScriptOpcode.DB_LISTALL]: () => {
        throw new Error('unimplemented');
    }
};

export default DebugOps;
