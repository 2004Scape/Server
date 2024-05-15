import LocType from '#lostcity/cache/LocType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import NpcType from '#lostcity/cache/NpcType.js';
import HuntType from '#lostcity/cache/HuntType.js';
import NpcMode from '#lostcity/entity/NpcMode.js';
import SpotanimType from '#lostcity/cache/SpotanimType.js';
import EnumType from '#lostcity/cache/EnumType.js';
import ObjType from '#lostcity/cache/ObjType.js';
import {Inventory} from '#lostcity/engine/Inventory.js';
import InvType from '#lostcity/cache/InvType.js';
import CategoryType from '#lostcity/cache/CategoryType.js';
import IdkType from '#lostcity/cache/IdkType.js';
import HuntVis from '#lostcity/entity/hunt/HuntVis.js';

interface ScriptValidator<T> {
    condition(input: T): boolean;
    throwMessage(): string;
}

class ScriptInputNumberNotNullValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input !== -1;
    throwMessage = (): string => 'An input number was null(-1).';
}

class ScriptInputStringNotNullValidator implements ScriptValidator<string> {
    condition = (input: string): boolean => input.length > 0;
    throwMessage = (): string => 'An input number was null(-1).';
}

class ScriptInputLocTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < LocType.count;
    throwMessage = (): string => 'An input for a Loc type was not in a valid range which it is impossible to spawn a null Loc noob!';
}

class ScriptInputLocAngleValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 3;
    throwMessage = (): string => 'An input for a Loc angle was out of range. Range should be: 0 to 3.';
}

class ScriptInputLocShapeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 31;
    throwMessage = (): string => 'An input for a Loc shape was out of range. Range should be: 0 to 31.';
}

class ScriptInputDurationValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input > 0;
    throwMessage = (): string => 'An input duration was out of range. Range should be greater than 0.';
}

class ScriptInputCoordValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 0x3ffffffffff;
    throwMessage = (): string => 'An input coord was out of range. Range should be: 0 to 4398046511103';
}

class ScriptInputParamTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < ParamType.count;
    throwMessage = (): string => 'An input for a Param type was not in a valid range.';
}

class ScriptInputNpcTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < NpcType.count;
    throwMessage = (): string => 'An input for a Npc type was not in a valid range.';
}

class ScriptInputNpcStatValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < 6;
    throwMessage = (): string => 'An input for a Npc stat was not in a valid range. Range should be: 0 to 5';
}

class ScriptInputQueueValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < 20;
    throwMessage = (): string => 'An input for an ai_queue was not in a valid range. Range should be: 0 to 19';
}

class ScriptInputHuntTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < HuntType.count;
    throwMessage = (): string => 'An input for a Hunt type was not in a valid range.';
}

class ScriptInputNpcModeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= -1 && input <= NpcMode.APNPC5;
    throwMessage = (): string => `An input for a Npc mode was not in a valid range. Range should be -1 to ${NpcMode.APNPC5}.`;
}

class ScriptInputHitTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 2;
    throwMessage = (): string => 'An input for a hit type was not in a valid range. Range should be 0 to 2.';
}

class ScriptInputSpotAnimTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < SpotanimType.count;
    throwMessage = (): string => 'An input for a SpotAnim type was not in a valid range.';
}

class ScriptInputEnumTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < EnumType.count;
    throwMessage = (): string => 'An input for an Enum type was not in a valid range.';
}

class ScriptInputObjTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < ObjType.count;
    throwMessage = (): string => 'An input for an Obj type was not in a valid range.';
}

class ScriptInputObjCountValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input > 0 && input <= Inventory.STACK_LIMIT;
    throwMessage = (): string => `An input for an Obj count was not in a valid range. Range should be: 1 to ${Inventory.STACK_LIMIT}.`;
}

class ScriptInputObjNotDummyValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => ObjType.get(input).dummyitem === 0;
    throwMessage = (): string => 'An input for an Obj was a graphic_only dummyitem.';
}

class ScriptInputInvTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < InvType.count;
    throwMessage = (): string => 'An input for an Inv type was not in a valid range.';
}

class ScriptInputCategoryTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < CategoryType.count;
    throwMessage = (): string => 'An input for an Category type was not in a valid range.';
}

class ScriptInputIDKTypeValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < IdkType.count;
    throwMessage = (): string => 'An input for an IDK type was not in a valid range.';
}

class ScriptInputHuntVisValidator implements ScriptValidator<number> {
    condition = (input: number): boolean => input >= HuntVis.OFF && input <= HuntVis.LINEOFWALK;
    throwMessage = (): string => `An input for a a hunt vis was not in a valid range. Range should be: ${HuntVis.OFF} to ${HuntVis.LINEOFWALK}.`;
}

export const NumberNotNull: ScriptValidator<number> = new ScriptInputNumberNotNullValidator();
export const StringNotNull: ScriptValidator<string> = new ScriptInputStringNotNullValidator();
export const LocTypeValid: ScriptValidator<number> = new ScriptInputLocTypeValidator();
export const LocAngleValid: ScriptValidator<number> = new ScriptInputLocAngleValidator();
export const LocShapeValid: ScriptValidator<number> = new ScriptInputLocShapeValidator();
export const DurationValid: ScriptValidator<number> = new ScriptInputDurationValidator();
export const CoordValid: ScriptValidator<number> = new ScriptInputCoordValidator();
export const ParamTypeValid: ScriptValidator<number> = new ScriptInputParamTypeValidator();
export const NpcTypeValid: ScriptValidator<number> = new ScriptInputNpcTypeValidator();
export const NpcStatValid: ScriptValidator<number> = new ScriptInputNpcStatValidator();
export const QueueValid: ScriptValidator<number> = new ScriptInputQueueValidator();
export const HuntTypeValid: ScriptValidator<number> = new ScriptInputHuntTypeValidator();
export const NpcModeValid: ScriptValidator<number> = new ScriptInputNpcModeValidator();
export const HitTypeValid: ScriptValidator<number> = new ScriptInputHitTypeValidator();
export const SpotAnimTypeValid: ScriptValidator<number> = new ScriptInputSpotAnimTypeValidator();
export const EnumTypeValid: ScriptValidator<number> = new ScriptInputEnumTypeValidator();
export const ObjTypeValid: ScriptValidator<number> = new ScriptInputObjTypeValidator();
export const ObjStackValid: ScriptValidator<number> = new ScriptInputObjCountValidator();
export const ObjNotDummyValid: ScriptValidator<number> = new ScriptInputObjNotDummyValidator();
export const InvTypeValid: ScriptValidator<number> = new ScriptInputInvTypeValidator();
export const CategoryTypeValid: ScriptValidator<number> = new ScriptInputCategoryTypeValidator();
export const IDKTypeValid: ScriptValidator<number> = new ScriptInputIDKTypeValidator();
export const HuntVisValid: ScriptValidator<number> = new ScriptInputHuntVisValidator();

export function check<T>(input: T, ...validators: ScriptValidator<T>[]): T {
    for (let index: number = 0; index < validators.length; index++) {
        const validator: ScriptValidator<T> = validators[index];
        if (!validator.condition(input)) {
            throw new Error(validator.throwMessage());
        }
    }
    return input;
}

