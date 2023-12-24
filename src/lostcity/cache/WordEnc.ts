import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';

export default class WordEnc {
    private static fragments: number[] = [];
    private static bads: string[][] = [];
    private static badCombinations: number[][][] = [];
    private static domains: string[][] = [];
    private static tlds: string[][] = [];
    private static tldTypes: number[] = [];
    private static whitelist: string[] = ['cook', 'cook\'s', 'cooks', 'seeks', 'sheet'];
    
    static load(dir: string) {
        if (!fs.existsSync(`${dir}/wordenc`)) {
            console.log('Warning: No wordenc found.');
            return;
        }

        const wordenc = Jagfile.load(`${dir}/wordenc`);

        const fragmentsenc = wordenc.read('fragmentsenc.txt');
        if (!fragmentsenc) {
            console.log('Warning: No fragmentsenc found.');
            return;
        }

        const badenc = wordenc.read('badenc.txt');
        if (!badenc) {
            console.log('Warning: No badenc found.');
            return;
        }

        const domainenc = wordenc.read('domainenc.txt');
        if (!domainenc) {
            console.log('Warning: No domainenc found.');
            return;
        }

        const tldlist = wordenc.read('tldlist.txt');
        if (!tldlist) {
            console.log('Warning: No tldlist found.');
            return;
        }

        this.readBad(badenc);
        this.readDomain(domainenc);
        this.readFragments(fragmentsenc);
        this.readTld(tldlist);
    }

    // ---- TLDLIST

    private static readTld(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.tldTypes[index] = packet.g1();
            this.tlds[index] = this.readTldInner(packet);
        }
    }

    private static readTldInner(packet: Packet, tlds: string[] = []): string[] {
        const count = packet.g1();
        for (let index = 0; index < count; index++) {
            tlds[index] = String.fromCharCode(packet.g1());
        }
        return tlds;
    }

    // ---- BADENC

    private static readBad(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.bads[index] = this.readBadInner(packet);
            const combos = this.readBadCombinations(packet);
            if (combos.length > 0) {
                this.badCombinations[index] = combos;
            }
        }
    }

    private static readBadInner(packet: Packet, bads: string[] = []): string[] {
        const count = packet.g1();
        for (let index = 0; index < count; index++) {
            bads[index] = String.fromCharCode(packet.g1());
        }
        return bads;
    }

    private static readBadCombinations(packet: Packet, combos: number[][] = []): number[][] {
        const count = packet.g1();
        for (let index = 0; index < count; index++) {
            combos[index] = [packet.g1(), packet.g1()];
        }
        return combos;
    }

    // ---- DOMAINENC

    private static readDomain(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.domains[index] = this.readDomainInner(packet);
        }
    }

    private static readDomainInner(packet: Packet, domains: string[] = []): string[] {
        const count = packet.g1();
        for (let index = 0; index < count; index++) {
            domains[index] = String.fromCharCode(packet.g1());
        }
        return domains;
    }

    // ---- FRAGMENTS

    private static readFragments(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.fragments[index] = packet.g2();
        }
    }

    // ----

    private static filterCharacters(chars: string[]): void {
        let pos = 0;
        for (let index = 0; index < chars.length; index++) {
            if (this.allowCharacter(chars[index])) {
                chars[pos] = chars[index];
            } else {
                chars[pos] = ' ';
            }
            if (pos === 0 || chars[pos] !== ' ' || chars[pos - 1] !== ' ') {
                pos++;
            }
        }
        for (let index = pos; index < chars.length; index++) {
            chars[index] = ' ';
        }
    }

    private static allowCharacter(char: string): boolean {
        return char >= ' ' && char <= '\u007f' || char == ' ' || char == '\n' || char == '\t' || char == '£' || char == '€';
    }
}