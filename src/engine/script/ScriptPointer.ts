import { CommandHandler } from '#/engine/script/ScriptRunner.js';
import ScriptState from '#/engine/script/ScriptState.js';

/**
 * Enumeration of possible pointer states used for runtime safety checks.
 */
enum ScriptPointer {
    ActivePlayer,
    ActivePlayer2,
    ProtectedActivePlayer,
    ProtectedActivePlayer2,
    ActiveNpc,
    ActiveNpc2,
    ActiveLoc,
    ActiveLoc2,
    ActiveObj,
    ActiveObj2,
    _LAST
}

export const ActiveNpc: ScriptPointer[] = [ScriptPointer.ActiveNpc, ScriptPointer.ActiveNpc2];
export const ActiveLoc: ScriptPointer[] = [ScriptPointer.ActiveLoc, ScriptPointer.ActiveLoc2];
export const ActiveObj: ScriptPointer[] = [ScriptPointer.ActiveObj, ScriptPointer.ActiveObj2];
export const ActivePlayer: ScriptPointer[] = [ScriptPointer.ActivePlayer, ScriptPointer.ActivePlayer2];
export const ProtectedActivePlayer: ScriptPointer[] = [ScriptPointer.ProtectedActivePlayer, ScriptPointer.ProtectedActivePlayer2];

/**
 * Wraps a command handler in another function that will check for pointer presence in the state.
 *
 * @param pointer The pointer to check for. If it is an array, the int operand is used as the index in the array.
 * @param handler The handler to run after checking the pointer.
 */
export function checkedHandler(pointer: ScriptPointer | ScriptPointer[], handler: CommandHandler) {
    return function (state: ScriptState) {
        if (typeof pointer === 'number') {
            state.pointerCheck(pointer);
        } else {
            state.pointerCheck(pointer[state.intOperand]);
        }
        handler(state);
    };
}

export default ScriptPointer;
