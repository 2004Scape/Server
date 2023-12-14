import fs from 'fs';
import Jagfile from '#jagex2/io/Jagfile.js';

const wordenc = Jagfile.load('dump/client/wordenc');

const badenc = wordenc.read('badenc.txt');
const domainenc = wordenc.read('domainenc.txt');
const fragmentsenc = wordenc.read('fragmentsenc.txt');
const tldlist = wordenc.read('tldlist.txt');

if (!badenc) {
    throw new Error('missing badenc.txt');
}

if (!domainenc) {
    throw new Error('missing domainenc.txt');
}

if (!fragmentsenc) {
    throw new Error('missing fragmentsenc.txt');
}

if (!tldlist) {
    throw new Error('missing tldlist.txt');
}

fs.mkdirSync('dump/src/wordenc', { recursive: true });

// ----

{
    fs.writeFileSync('dump/src/wordenc/badenc.txt', '');

    const total = badenc.g4();
    for (let i = 0; i < total; i++) {
        let badword = '';
        const count = badenc.g1();
        for (let j = 0; j < count; j++) {
            badword += String.fromCharCode(badenc.g1());
        }
        fs.appendFileSync('dump/src/wordenc/badenc.txt', badword);

        const combinations = badenc.g1();
        for (let j = 0; j < combinations; j++) {
            const a = badenc.g1();
            const b = badenc.g1();

            fs.appendFileSync('dump/src/wordenc/badenc.txt', ` ${a}:${b}`);
        }

        fs.appendFileSync('dump/src/wordenc/badenc.txt', '\n');
    }
}

// ----

{
    fs.writeFileSync('dump/src/wordenc/domainenc.txt', '');

    const total = domainenc.g4();
    for (let i = 0; i < total; i++) {
        let domain = '';
        const count = domainenc.g1();
        for (let j = 0; j < count; j++) {
            domain += String.fromCharCode(domainenc.g1());
        }

        fs.appendFileSync('dump/src/wordenc/domainenc.txt', domain + '\n');
    }
}

// ----

{
    fs.writeFileSync('dump/src/wordenc/fragmentsenc.txt', '');

    const total = fragmentsenc.g4();
    for (let i = 0; i < total; i++) {
        const fragment = fragmentsenc.g2();
        fs.appendFileSync('dump/src/wordenc/fragmentsenc.txt', fragment + '\n');
    }
}

// ----

{
    fs.writeFileSync('dump/src/wordenc/tldlist.txt', '');

    const total = tldlist.g4();
    for (let i = 0; i < total; i++) {
        const type = tldlist.g1();

        let tld = '';
        const count = tldlist.g1();
        for (let j = 0; j < count; j++) {
            tld += String.fromCharCode(tldlist.g1());
        }

        fs.appendFileSync('dump/src/wordenc/tldlist.txt', `${tld} ${type}\n`);
    }
}
