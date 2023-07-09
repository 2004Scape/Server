import ScriptOpcodes from '#lostcity/engine/ScriptOpcodes.js';
import path from 'path';
import Packet from "#jagex2/io/Packet.js";

export interface ScriptInfo {
    scriptName: string,
    sourceFilePath: string,
    pcs: number[],
    lines: number[]
}

export type SwitchTable = {
    [key: number]: number | undefined
}

// compiled bytecode representation
export default class Script {
    info: ScriptInfo = {
        scriptName: "<unknown>",
        sourceFilePath: "<unknown>",
        pcs: [],
        lines: []
    };

    intLocalCount = 0;
    stringLocalCount = 0;
    intArgCount = 0;
    stringArgCount = 0;
    switchTables: SwitchTable[] = [];
    opcodes: number[] = [];
    intOperands: number[] = [];
    stringOperands: string[] = [];

    // decodes the same binary format as clientscript2
    static decode(stream: Packet): Script {
        if (stream.length < 16) {
            throw new Error('Invalid script file (minimum length)');
        }

        stream.pos = stream.length - 2;

        let trailerLen = stream.g2();
        let trailerPos = stream.length - trailerLen - 12 - 2;

        if (trailerPos < 0 || trailerPos >= stream.length) {
            throw new Error('Invalid script file (bad trailer pos)');
        }

        stream.pos = trailerPos;

        let script = new Script();
        let _instructions = stream.g4(); // we don't need to preallocate anything in JS, but still need to read it
        script.intLocalCount = stream.g2();
        script.stringLocalCount = stream.g2();
        script.intArgCount = stream.g2();
        script.stringArgCount = stream.g2();

        let switches = stream.g1();
        for (let i = 0; i < switches; i++) {
            let count = stream.g2();
            let table: SwitchTable = [];

            for (let j = 0; j < count; j++) {
                let key = stream.g4();
                let offset = stream.g4s();
                table[key] = offset;
            }

            script.switchTables[i] = table;
        }

        stream.pos = 0;
        script.info.scriptName = stream.gjnstr();
        script.info.sourceFilePath = stream.gjnstr();

        let lineNumberTableLength = stream.g2();
        for (let i = 0; i < lineNumberTableLength; i++) {
            script.info.pcs.push(stream.g4());
            script.info.lines.push(stream.g4());
        }

        let instr = 0;
        while (trailerPos > stream.pos) {
            let opcode = stream.g2();

            if (opcode === 3) {
                script.stringOperands[instr] = stream.gjnstr();
            } else if (opcode < 100 && opcode !== ScriptOpcodes.RETURN && opcode !== ScriptOpcodes.POP_INT_DISCARD && opcode !== ScriptOpcodes.POP_STRING_DISCARD) {
                script.intOperands[instr] = stream.g4s();
            } else {
                script.intOperands[instr] = stream.g1();
            }

            script.opcodes[instr++] = opcode;
        }

        return script;
    }

    get name() {
        return this.info.scriptName;
    }

    get fileName() {
        return path.basename(this.info.sourceFilePath);
    }

    lineNumber(pc: number) {
        for (let i = 0; i < this.info.pcs.length; i++) {
            if (this.info.pcs[i] > pc) {
                return this.info.lines[i - 1];
            }
        }

        return this.info.lines[this.info.lines.length - 1];
    }
}
