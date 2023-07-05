import ScriptOpcodes from '#lostcity/engine/ScriptOpcodes.js';
import path from 'path';

// compiled bytecode representation
export default class Script {
    info = {
        scriptName: null,
        sourceFilePath: null,
        pcs: [],
        lines: []
    };

    intLocals = 0;
    stringLocals = 0;
    intArgs = 0;
    stringArgs = 0;
    switchTables = [];
    opcodes = [];
    intOperands = [];
    stringOperands = [];

    // decodes the same binary format as clientscript2
    static decode(stream) {
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

        let sscript = new Script();
        let _instructions = stream.g4(); // we don't need to preallocate anything in JS, but still need to read it
        sscript.intLocalCount = stream.g2();
        sscript.stringLocalCount = stream.g2();
        sscript.intArgCount = stream.g2();
        sscript.stringArgCount = stream.g2();

        let switches = stream.g1();
        for (let i = 0; i < switches; i++) {
            let count = stream.g2();
            let table = [];

            for (let j = 0; j < count; j++) {
                let key = stream.g4();
                let offset = stream.g4s();
                table[key] = offset;
            }

            sscript.switchTables[i] = table;
        }

        stream.pos = 0;
        sscript.info.scriptName = stream.gjnstr();
        sscript.info.sourceFilePath = stream.gjnstr();

        let lineNumberTableLength = stream.g2();
        for (let i = 0; i < lineNumberTableLength; i++) {
            sscript.info.pcs.push(stream.g4());
            sscript.info.lines.push(stream.g4());
        }

        let instr = 0;
        while (trailerPos > stream.pos) {
            let opcode = stream.g2();

            if (opcode === 3) {
                sscript.stringOperands[instr] = stream.gjnstr();
            } else if (opcode < 100 && opcode !== ScriptOpcodes.RETURN && opcode !== ScriptOpcodes.POP_INT_DISCARD && opcode !== ScriptOpcodes.POP_STRING_DISCARD) {
                sscript.intOperands[instr] = stream.g4s();
            } else {
                sscript.intOperands[instr] = stream.g1();
            }

            sscript.opcodes[instr++] = opcode;
        }

        return sscript;
    }

    get name() {
        return this.info.scriptName;
    }

    get fileName() {
        return path.basename(this.info.sourceFilePath);
    }

    lineNumber(pc) {
        for (let i = 0; i < this.info.pcs.length; i++) {
            if (this.info.pcs[i] > pc) {
                return this.info.lines[i - 1];
            }
        }

        return this.info.lines[this.info.lines.length - 1];
    }
}
