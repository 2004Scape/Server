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

export interface ScriptInputValidator<T> {
    condition(input: T): boolean;
    throwMessage(): string;
}

export class ScriptInputNumberNotNullValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input !== -1;
    throwMessage = (): string => 'An input number was null(-1).';
}

export class ScriptInputStringNotNullValidator implements ScriptInputValidator<string> {
    condition = (input: string): boolean => input.length > 0;
    throwMessage = (): string => 'An input number was null(-1).';
}

export class ScriptInputLocTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < LocType.count;
    throwMessage = (): string => 'An input for a Loc type was not in a valid range which it is impossible to spawn a null Loc noob!';
}

export class ScriptInputLocAngleValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 3;
    throwMessage = (): string => 'An input for a Loc angle was out of range. Range should be: 0 to 3.';
}

export class ScriptInputLocShapeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 31;
    throwMessage = (): string => 'An input for a Loc shape was out of range. Range should be: 0 to 31.';
}

export class ScriptInputDurationValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input > 0;
    throwMessage = (): string => 'An input duration was out of range. Range should be greater than 0.';
}

export class ScriptInputCoordValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 0x3ffffffffff;
    throwMessage = (): string => 'An input coord was out of range. Range should be: 0 to 4398046511103';
}

export class ScriptInputParamTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < ParamType.count;
    throwMessage = (): string => 'An input for a Param type was not in a valid range.';
}

export class ScriptInputNpcTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < NpcType.count;
    throwMessage = (): string => 'An input for a Npc type was not in a valid range.';
}

export class ScriptInputNpcStatValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < 6;
    throwMessage = (): string => 'An input for a Npc stat was not in a valid range. Range should be: 0 to 5';
}

export class ScriptInputQueueValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < 20;
    throwMessage = (): string => 'An input for an ai_queue was not in a valid range. Range should be: 0 to 19';
}

export class ScriptInputHuntTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < HuntType.count;
    throwMessage = (): string => 'An input for a Hunt type was not in a valid range.';
}

export class ScriptInputNpcModeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= -1 && input <= NpcMode.APNPC5;
    throwMessage = (): string => `An input for a Npc mode was not in a valid range. Range should be -1 to ${NpcMode.APNPC5}.`;
}

export class ScriptInputHitTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input <= 2;
    throwMessage = (): string => 'An input for a hit type was not in a valid range. Range should be 0 to 2.';
}

export class ScriptInputSpotAnimTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < SpotanimType.count;
    throwMessage = (): string => 'An input for a SpotAnim type was not in a valid range.';
}

export class ScriptInputEnumTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < EnumType.count;
    throwMessage = (): string => 'An input for an Enum type was not in a valid range.';
}

export class ScriptInputObjTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < ObjType.count;
    throwMessage = (): string => 'An input for an Obj type was not in a valid range.';
}

export class ScriptInputObjCountValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input > 0 && input <= Inventory.STACK_LIMIT;
    throwMessage = (): string => `An input for an Obj count was not in a valid range. Range should be: 1 to ${Inventory.STACK_LIMIT}.`;
}

export class ScriptInputObjNotDummyValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => ObjType.get(input).dummyitem === 0;
    throwMessage = (): string => 'An input for an Obj was a graphic_only dummyitem.';
}

export class ScriptInputInvTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < InvType.count;
    throwMessage = (): string => 'An input for an Inv type was not in a valid range.';
}

export class ScriptInputCategoryTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < CategoryType.count;
    throwMessage = (): string => 'An input for an Category type was not in a valid range.';
}

export class ScriptInputIDKTypeValidator implements ScriptInputValidator<number> {
    condition = (input: number): boolean => input >= 0 && input < IdkType.count;
    throwMessage = (): string => 'An input for an IDK type was not in a valid range.';
}

export const NumberNotNull: ScriptInputValidator<number> = new ScriptInputNumberNotNullValidator();
export const StringNotNull: ScriptInputValidator<string> = new ScriptInputStringNotNullValidator();
export const LocTypeValid: ScriptInputValidator<number> = new ScriptInputLocTypeValidator();
export const LocAngleValid: ScriptInputValidator<number> = new ScriptInputLocAngleValidator();
export const LocShapeValid: ScriptInputValidator<number> = new ScriptInputLocShapeValidator();
export const DurationValid: ScriptInputValidator<number> = new ScriptInputDurationValidator();
export const CoordValid: ScriptInputValidator<number> = new ScriptInputCoordValidator();
export const ParamTypeValid: ScriptInputValidator<number> = new ScriptInputParamTypeValidator();
export const NpcTypeValid: ScriptInputValidator<number> = new ScriptInputNpcTypeValidator();
export const NpcStatValid: ScriptInputValidator<number> = new ScriptInputNpcStatValidator();
export const QueueValid: ScriptInputValidator<number> = new ScriptInputQueueValidator();
export const HuntTypeValid: ScriptInputValidator<number> = new ScriptInputHuntTypeValidator();
export const NpcModeValid: ScriptInputValidator<number> = new ScriptInputNpcModeValidator();
export const HitTypeValid: ScriptInputValidator<number> = new ScriptInputHitTypeValidator();
export const SpotAnimTypeValid: ScriptInputValidator<number> = new ScriptInputSpotAnimTypeValidator();
export const EnumTypeValid: ScriptInputValidator<number> = new ScriptInputEnumTypeValidator();
export const ObjTypeValid: ScriptInputValidator<number> = new ScriptInputObjTypeValidator();
export const ObjStackValid: ScriptInputValidator<number> = new ScriptInputObjCountValidator();
export const ObjNotDummyValid: ScriptInputValidator<number> = new ScriptInputObjNotDummyValidator();
export const InvTypeValid: ScriptInputValidator<number> = new ScriptInputInvTypeValidator();
export const CategoryTypeValid: ScriptInputValidator<number> = new ScriptInputCategoryTypeValidator();
export const IDKTypeValid: ScriptInputValidator<number> = new ScriptInputIDKTypeValidator();

export function check<T>(input: T, ...validators: ScriptInputValidator<T>[]): T {
    for (let index: number = 0; index < validators.length; index++) {
        const validator: ScriptInputValidator<T> = validators[index];
        if (!validator.condition(input)) {
            throw new Error(validator.throwMessage());
        }
    }
    return input;
}

