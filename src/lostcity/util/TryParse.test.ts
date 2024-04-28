import { tryParseBoolean, tryParseInt, tryParseString } from './TryParse.js';

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
});
