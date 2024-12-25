import {tryParseBoolean, tryParseInt, tryParseString, tryParseArray} from '#/util/TryParse.js';

describe('TryParse', (): void => {
    describe('tryParseBoolean', (): void => {
        it('should parse booleans', (): void => {
            expect(tryParseBoolean('true', false)).toEqual(true);
            expect(tryParseBoolean('false', true)).toEqual(false);
            expect(tryParseBoolean(true, false)).toEqual(true);
            expect(tryParseBoolean(false, true)).toEqual(false);
            expect(tryParseBoolean('nonBooleanString', false)).toEqual(false);
            expect(tryParseBoolean('', true)).toEqual(true);
            expect(tryParseBoolean(undefined, true)).toEqual(true);
        });
    });

    describe('tryParseInt', (): void => {
        it('should parse integers', (): void => {
            expect(tryParseInt('100', 101)).toEqual(100);
            expect(tryParseInt(100, 101)).toEqual(100);
            expect(tryParseInt(undefined, 101)).toEqual(101);
        });
    });

    describe('tryParseString', (): void => {
        it('should parse strings', (): void => {
            expect(tryParseString('string', 'defaultValue')).toEqual('string');
            expect(tryParseString(undefined, 'defaultValue')).toEqual('defaultValue');
        });
    });

    describe('tryParseStringArray', (): void => {
        it('should parse string arrays', (): void => {
            expect(tryParseArray(['string'], [])).toEqual(['string']);
            expect(tryParseArray(undefined, [])).toEqual([]);
        });
    });

    describe('tryParseNumberArray', (): void => {
        it('should parse number arrays', (): void => {
            expect(tryParseArray([69], [])).toEqual([69]);
            expect(tryParseArray(undefined, [])).toEqual([]);
        });
    });
});
