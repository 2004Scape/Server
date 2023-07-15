import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import DbRowType from "#lostcity/cache/DbRowType.js";
import DbTableType from "#lostcity/cache/DbTableType.js";
import ScriptVarType from "#lostcity/cache/ScriptVarType.js";

const DebugOps: CommandHandlers = {
    [ScriptOpcode.DB_FIND_WITH_COUNT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.DB_FINDNEXT]: (state) => {
        if (!state.dbTable) {
            throw new Error("No table selected");
        }

        if (state.dbRow + 1 >= state.dbRowQuery.length) {
            state.pushInt(-1); // null
            return;
        }

        state.dbRow++;

        let row = DbRowType.get(state.dbRowQuery[state.dbRow]);
        state.pushInt((state.dbTable.id << 16) | row.id & 0xFFFF);
    },

    [ScriptOpcode.DB_GETFIELD]: (state) => {
        let [tableRowPacked, tableColumnPacked, listIndex] = state.popInts(3);

        let tableRow = (tableRowPacked >> 16) & 0xFFFF;
        let row = tableRowPacked & 0xFFFF;

        let tableColumn = (tableColumnPacked >> 12) & 0xFFFF;
        let column = (tableColumnPacked >> 4) & 0x7F;
        let tuple = tableColumnPacked & 0x3F;

        let rowType = DbRowType.get(row);
        let table = DbTableType.get(tableColumn);

        if (tableRow !== tableColumn) {
            if (table.types[column][0] === ScriptVarType.STRING) {
                state.pushString('');
                return;
            } else {
                state.pushInt(-1);
                return;
            }
        }

        let values = rowType.getValue(column, listIndex);
        for (let i = 0; i < values.length; i++) {
            if (rowType.types[column][i] === ScriptVarType.STRING) {
                state.pushString(values[i]);
            } else {
                state.pushInt(values[i]);
            }
        }
    },

    [ScriptOpcode.DB_GETFIELDCOUNT]: (state) => {
        let [tableRowPacked, tableColumnPacked] = state.popInts(2);

        let tableRow = (tableRowPacked >> 16) & 0xFFFF;
        let row = tableRowPacked & 0xFFFF;

        let tableColumn = (tableColumnPacked >> 12) & 0xFFFF;
        let column = (tableColumnPacked >> 4) & 0x7F;
        let tuple = tableColumnPacked & 0x3F;

        let rowType = DbRowType.get(row);
        let table = DbTableType.get(tableColumn);

        if (tableRow !== tableColumn) {
            state.pushInt(0);
        }

        state.pushInt(rowType.columnValues[column].length / table.types[column].length);
    },

    [ScriptOpcode.DB_LISTALL_WITH_COUNT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.DB_GETROWTABLE]: (state) => {
        let tableRowPacked = state.popInt();

        let tableRow = (tableRowPacked >> 16) & 0xFFFF;
        let row = tableRowPacked & 0xFFFF;

        state.pushInt(tableRow);
    },

    [ScriptOpcode.DB_FINDBYINDEX]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.DB_FIND_REFINE_WITH_COUNT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.DB_FIND]: (state) => {
        let isString = state.popInt() == 2;
        let query = isString ? state.popString() : state.popInt();
        let tableColumnPacked = state.popInt();

        let table = (tableColumnPacked >> 12) & 0xFFFF;
        let column = (tableColumnPacked >> 4) & 0x7F;
        let tuple = tableColumnPacked & 0x3F;

        state.dbTable = DbTableType.get(table);
        state.dbRow = -1;
        state.dbRowQuery = [];

        // search for rows that match the query (table + column + query)
        let rows = DbRowType.getInTable(table);
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];

            if (row.columnValues[column].includes(query)) {
                state.dbRowQuery.push(row.id);
            }
        }

        state.pushInt(state.dbRowQuery.length);
    },

    [ScriptOpcode.DB_FIND_REFINE]: (state) => {
        let isString = state.popInt() == 2;
        let query = isString ? state.popString() : state.popInt();
        let tableColumnPacked = state.popInt();

        let table = (tableColumnPacked >> 12) & 0xFFFF;
        let column = (tableColumnPacked >> 4) & 0x7F;
        let tuple = tableColumnPacked & 0x3F;

        // ----

        let found = [];
        let rows = DbRowType.getInTable(table);
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];

            if (row.columnValues[column].includes(query)) {
                found.push(row.id);
            }
        }

        // merge with previous query
        let prevQuery = state.dbRowQuery;
        state.dbRow = -1;
        state.dbRowQuery = [];
        for (let i = 0; i < prevQuery.length; i++) {
            if (found.includes(prevQuery[i])) {
                state.dbRowQuery.push(prevQuery[i]);
            }
        }

        state.pushInt(state.dbRowQuery.length);
    },

    [ScriptOpcode.DB_LISTALL]: (state) => {
        throw new Error("unimplemented");
    },
};

export default DebugOps;
