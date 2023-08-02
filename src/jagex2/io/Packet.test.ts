import Packet from '#jagex2/io/Packet';
import forge from 'node-forge';
import fs from 'fs';

const randomBytes = (count: number): Uint8Array => {
    const result = new Uint8Array(count);
    for (let i = 0; i < count; ++i) {
        result[i] = Math.floor(256 * Math.random());
    }
    return result;
};

describe('Packet', () => {
    test('test bool', () => {
        const expected = Packet.alloc(1);
        expected.pbool(true);
        const result = new Packet(expected);
        expect(result.gbool()).toBe(true);
    });

    test('test 1', () => {
        const expected = Packet.alloc(1);
        expected.p1(255);
        const result = new Packet(expected);
        expect(result.g1()).toBe(255);
    });

    test('test 1 signed a', () => {
        const expected = Packet.alloc(1);
        expected.p1(69);
        const result = new Packet(expected);
        expect(result.g1s()).toBe(69);
    });

    test('test 1 signed b', () => {
        const expected = Packet.alloc(1);
        expected.p1(169);
        const result = new Packet(expected);
        expect(result.g1s()).toBe(-87);
    });

    test('test 2', () => {
        const expected = Packet.alloc(2);
        expected.p2(65535);
        const result = new Packet(expected);
        expect(result.g2()).toBe(65535);
    });

    test('test 2 signed a', () => {
        const expected = Packet.alloc(2);
        expected.p2(32767);
        const result = new Packet(expected);
        expect(result.g2s()).toBe(32767);
    });

    test('test 2 signed b', () => {
        const expected = Packet.alloc(2);
        expected.p2(32768);
        const result = new Packet(expected);
        expect(result.g2s()).toBe(-32768);
    });

    test('test 2 LE', () => {
        const expected = Packet.alloc(2);
        expected.ip2(65535);
        const result = new Packet(expected);
        expect(result.ig2()).toBe(65535);
    });

    test('test 3', () => {
        const expected = Packet.alloc(3);
        expected.p3(16777215);
        const result = new Packet(expected);
        expect(result.g3()).toBe(16777215);
    });

    test('test 4', () => {
        const expected = Packet.alloc(4);
        expected.p4(4294967295);
        const result = new Packet(expected);
        expect(result.g4()).toBe(4294967295);
    });

    test('test 4 LE', () => {
        const expected = Packet.alloc(4);
        expected.ip4(2147483647);
        const result = new Packet(expected);
        expect(result.ig4()).toBe(2147483647);
    });

    test('test 4 signed a', () => {
        const expected = Packet.alloc(4);
        expected.p4(2147483647);
        const result = new Packet(expected);
        expect(result.g4s()).toBe(2147483647);
    });

    test('test 4 signed b', () => {
        const expected = Packet.alloc(4);
        expected.p4(2147483648);
        const result = new Packet(expected);
        expect(result.g4s()).toBe(-2147483648);
    });

    test('test 8', () => {
        const expected = Packet.alloc(4);
        expected.p8(BigInt(9007199254740991));
        const result = new Packet(expected);
        expect(result.g8()).toBe(BigInt(9007199254740991));
    });

    test('test jstr', () => {
        const string = 'Hello World!';
        const expected = Packet.alloc(string.length + 1);
        expected.pjstr(string);
        const result = new Packet(expected);
        expect(result.gjstr()).toBe(string);
    });

    test('test jnstr', () => {
        const string = 'Hello World!';
        const expected = Packet.alloc(string.length + 1);
        expected.pjnstr(string);
        const result = new Packet(expected);
        expect(result.gjnstr()).toBe(string);
    });

    test('test data', () => {
        const random = randomBytes(255);
        const expected = Packet.alloc(random.length);
        expected.pdata(random);
        const result = new Packet(expected);
        expect(result.gdata()).toStrictEqual(random);
    });

    test('test smart 1', () => {
        const expected = Packet.alloc(2);
        expected.psmart(2);
        const result = new Packet(expected);
        expect(result.gsmart()).toBe(2);
    });

    test('test smart 2', () => {
        const expected = Packet.alloc(2);
        expected.psmart(169);
        const result = new Packet(expected);
        expect(result.gsmart()).toBe(169);
    });

    test('test smart signed 1a', () => {
        const expected = Packet.alloc(1);
        expected.psmarts(13);
        const result = new Packet(expected);
        expect(result.gsmarts()).toBe(13);
    });

    test('test smart signed 1b', () => {
        const expected = Packet.alloc(1);
        expected.psmarts(-13);
        const result = new Packet(expected);
        expect(result.gsmarts()).toBe(-13);
    });

    test('test smart signed 2a', () => {
        const expected = Packet.alloc(2);
        expected.psmarts(69);
        const result = new Packet(expected);
        expect(result.gsmarts()).toBe(69);
    });

    test('test smart signed 2b', () => {
        const expected = Packet.alloc(2);
        expected.psmarts(-69);
        const result = new Packet(expected);
        expect(result.gsmarts()).toBe(-69);
    });

    test('test rsa', () => {
        const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));
        const expected = Packet.alloc(0);
        expected.rsaenc(priv);
        const result = new Packet(expected);
        result.rsadec(priv);
        expect(result.data).toStrictEqual(expected.data);
    });

    test('test bits', () => {
        const expected = Packet.alloc(2);
        expected.bits();
        expected.pBit(1, 0);
        expected.pBit(4, 3);
        expected.pBit(7, 13);
        expected.bytes();
        const result = new Packet(expected);
        result.bits();
        expect(result.gBit(1)).toBe(0);
        expect(result.gBit(4)).toBe(3);
        expect(result.gBit(7)).toBe(13);
        result.bytes();
    });

    test('test psize 1', () => {
        const expected = Packet.alloc(2);
        expected.pos++;
        expected.p1(69);
        expected.psize1(1);
        const result = new Packet(expected);
        expect(result.g1()).toBe(1);
        expect(result.g1()).toBe(69);
    });

    test('test psize 2', () => {
        const expected = Packet.alloc(4);
        expected.pos += 2;
        expected.p2(65535);
        expected.psize2(2);
        const result = new Packet(expected);
        expect(result.g2()).toBe(2);
        expect(result.g2()).toBe(65535);
    });

    test('test psize 4', () => {
        const expected = Packet.alloc(8);
        expected.pos += 4;
        expected.p4(2147483647);
        expected.psize4(4);
        const result = new Packet(expected);
        expect(result.g4()).toBe(4);
        expect(result.g4()).toBe(2147483647);
    });

    test('test packet', () => {
        const expected = Packet.alloc(4);
        expected.p4(2147483647);
        expected.pos = 0;
        const result = new Packet(expected);
        expect(result.gPacket()).toStrictEqual(expected);
    });
});