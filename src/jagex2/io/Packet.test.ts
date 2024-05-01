import forge from 'node-forge';
import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

describe('Packet', () => {
    describe('test 1', () => {
        it('bool', () => {
            const expected = Packet.alloc(1);
            expected.pbool(true);
            const result = new Packet(expected);
            expect(result.gbool()).toBeTruthy();
        });

        it('unsigned', () => {
            const expected = Packet.alloc(1);
            expected.p1(255);
            const result = new Packet(expected);
            expect(result.g1()).toBe(255);
        });

        it('signed a', () => {
            const expected = Packet.alloc(1);
            expected.p1(69);
            const result = new Packet(expected);
            expect(result.g1s()).toBe(69);
        });

        it('signed b', () => {
            const expected = Packet.alloc(1);
            expected.p1(169);
            const result = new Packet(expected);
            expect(result.g1s()).toBe(-87);
        });
    });

    describe('test 2', () => {
        it('unsigned', () => {
            const expected = Packet.alloc(2);
            expected.p2(65535);
            const result = new Packet(expected);
            expect(result.g2()).toBe(65535);
        });

        it('signed a', () => {
            const expected = Packet.alloc(2);
            expected.p2(32767);
            const result = new Packet(expected);
            expect(result.g2s()).toBe(32767);
        });

        it('signed b', () => {
            const expected = Packet.alloc(2);
            expected.p2(32768);
            const result = new Packet(expected);
            expect(result.g2s()).toBe(-32768);
        });

        it('little endian', () => {
            const expected = Packet.alloc(2);
            expected.ip2(65535);
            const result = new Packet(expected);
            expect(result.ig2()).toBe(65535);
        });
    });

    describe('test 3', () => {
        it('unsigned', () => {
            const expected = Packet.alloc(3);
            expected.p3(16777215);
            const result = new Packet(expected);
            expect(result.g3()).toBe(16777215);
        });
    });

    describe('test 4', () => {
        it('unsigned', () => {
            const expected = Packet.alloc(4);
            expected.p4(4294967295);
            const result = new Packet(expected);
            expect(result.g4()).toBe(4294967295);
        });

        it('signed a', () => {
            const expected = Packet.alloc(4);
            expected.p4(2147483647);
            const result = new Packet(expected);
            expect(result.g4s()).toBe(2147483647);
        });

        it('signed b', () => {
            const expected = Packet.alloc(4);
            expected.p4(2147483648);
            const result = new Packet(expected);
            expect(result.g4s()).toBe(-2147483648);
        });

        it('little endian', () => {
            const expected = Packet.alloc(4);
            expected.ip4(2147483647);
            const result = new Packet(expected);
            expect(result.ig4()).toBe(2147483647);
        });
    });

    describe('test 8', () => {
        it('unsigned', () => {
            const expected = Packet.alloc(4);
            expected.p8(BigInt(9007199254740991));
            const result = new Packet(expected);
            expect(result.g8()).toBe(BigInt(9007199254740991));
        });
    });

    describe('test string', () => {
        it('jstr', () => {
            const string = 'Hello World!';
            const expected = Packet.alloc(string.length + 1);
            expected.pjstr(string);
            const result = new Packet(expected);
            expect(result.gjstr()).toBe(string);
        });

        it('jnstr', () => {
            const string = 'Hello World!';
            const expected = Packet.alloc(string.length + 1);
            expected.pjnstr(string);
            const result = new Packet(expected);
            expect(result.gjnstr()).toBe(string);
        });
    });

    describe('test data', () => {
        it('data', () => {
            const bytes = new Uint8Array(5);
            bytes[0] = 69;
            bytes[1] = 59;
            bytes[2] = 49;
            bytes[3] = 39;
            bytes[4] = 29;
            const expected = Packet.alloc(bytes.length);
            expected.pdata(bytes);
            const result = new Packet(expected);
            expect(result.gdata()).toStrictEqual(bytes);
        });
    });

    describe('test smart', () => {
        it('unsigned a', () => {
            const expected = Packet.alloc(2);
            expected.psmart(2);
            const result = new Packet(expected);
            expect(result.gsmart()).toBe(2);
        });

        it('unsigned b', () => {
            const expected = Packet.alloc(2);
            expected.psmart(169);
            const result = new Packet(expected);
            expect(result.gsmart()).toBe(169);
        });

        it('signed 1a', () => {
            const expected = Packet.alloc(1);
            expected.psmarts(13);
            const result = new Packet(expected);
            expect(result.gsmarts()).toBe(13);
        });

        it('signed 1b', () => {
            const expected = Packet.alloc(1);
            expected.psmarts(-13);
            const result = new Packet(expected);
            expect(result.gsmarts()).toBe(-13);
        });

        it('signed 2a', () => {
            const expected = Packet.alloc(2);
            expected.psmarts(69);
            const result = new Packet(expected);
            expect(result.gsmarts()).toBe(69);
        });

        it('signed 2b', () => {
            const expected = Packet.alloc(2);
            expected.psmarts(-69);
            const result = new Packet(expected);
            expect(result.gsmarts()).toBe(-69);
        });
    });

    describe('test size', () => {
        it('psize 1', () => {
            const expected = Packet.alloc(2);
            expected.pos++;
            expected.p1(69);
            expected.psize1(1);
            const result = new Packet(expected);
            expect(result.g1()).toBe(1);
            expect(result.g1()).toBe(69);
        });

        it('psize 2', () => {
            const expected = Packet.alloc(4);
            expected.pos += 2;
            expected.p2(65535);
            expected.psize2(2);
            const result = new Packet(expected);
            expect(result.g2()).toBe(2);
            expect(result.g2()).toBe(65535);
        });

        it('psize 4', () => {
            const expected = Packet.alloc(8);
            expected.pos += 4;
            expected.p4(2147483647);
            expected.psize4(4);
            const result = new Packet(expected);
            expect(result.g4()).toBe(4);
            expect(result.g4()).toBe(2147483647);
        });
    });

    describe('test rsa', () => {
        it('rsa', () => {
            const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));
            const expected = Packet.alloc(0);
            expected.rsaenc(priv);
            const result = new Packet(expected);
            result.rsadec(priv);
            expect(result.data).toStrictEqual(expected.data);
        });
    });

    describe('test bits', () => {
        it('bits', () => {
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
    });

    describe('test packet', () => {
        it('packet', () => {
            const expected = Packet.alloc(4);
            expected.p4(2147483647);
            expected.pos = 0;
            const result = new Packet(expected);
            expect(result.gPacket()).toStrictEqual(expected);
        });
    });
});
