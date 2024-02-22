import Packet from '#jagex2/io/Packet.js';
import WordPack from '#jagex2/wordenc/WordPack.js';

describe('WordPack', (): void => {
    describe('unpack', (): void => {
        it('result after test', (): void => {
            const packet: Packet = new Packet(Uint8Array.from([33, 130]));
            expect(WordPack.unpack(packet, 2)).toBe('Test');
        });

        it('result after zezima', (): void => {
            const packet: Packet = new Packet(Uint8Array.from([221, 29, 213, 208, 48]));
            expect(WordPack.unpack(packet, 5)).toBe('Zezima ');
        });
    });

    describe('pack', (): void => {
        it('result after test', (): void => {
            const packet: Packet = new Packet(new Uint8Array(2));
            WordPack.pack(packet, 'Test');
            expect(packet.data).toStrictEqual(Uint8Array.from([33, 130]));
        });

        it('result after zezima', (): void => {
            const packet: Packet = new Packet(new Uint8Array(5));
            WordPack.pack(packet, 'Zezima');
            expect(packet.data).toStrictEqual(Uint8Array.from([221, 29, 213, 208, 48]));
        });
    });
});
