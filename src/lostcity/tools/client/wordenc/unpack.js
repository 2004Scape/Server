import fs from 'fs';
import Jagfile from '#jagex2/io/Jagfile.js';

let wordenc = Jagfile.load('dump/client/wordenc');

let badenc = wordenc.read('badenc.txt');
let domainenc = wordenc.read('domainenc.txt');
let fragmentsenc = wordenc.read('fragmentsenc.txt');
let tldlist = wordenc.read('tldlist.txt');

fs.mkdirSync('dump/src/wordenc', { recursive: true });

// ----

{
    fs.writeFileSync('dump/src/wordenc/badenc.txt', '');

    let total = badenc.g4();
    for (let i = 0; i < total; i++) {
        let badword = '';
        let count = badenc.g1();
        for (let j = 0; j < count; j++) {
            badword += String.fromCharCode(badenc.g1());
        }
        fs.appendFileSync('dump/src/wordenc/badenc.txt', badword);

        let combinations = badenc.g1();
        for (let j = 0; j < combinations; j++) {
            let a = badenc.g1();
            let b = badenc.g1();

            fs.appendFileSync('dump/src/wordenc/badenc.txt', ` ${a}:${b}`);
        }

        fs.appendFileSync('dump/src/wordenc/badenc.txt', '\n');
    }
}

// ----

{
    fs.writeFileSync('dump/src/wordenc/domainenc.txt', '');

    let total = domainenc.g4();
    for (let i = 0; i < total; i++) {
        let domain = '';
        let count = domainenc.g1();
        for (let j = 0; j < count; j++) {
            domain += String.fromCharCode(domainenc.g1());
        }

        fs.appendFileSync('dump/src/wordenc/domainenc.txt', domain + '\n');
    }
}

// ----

{
    fs.writeFileSync('dump/src/wordenc/fragmentsenc.txt', '');

    let total = fragmentsenc.g4();
    for (let i = 0; i < total; i++) {
        let fragment = fragmentsenc.g2();
        fs.appendFileSync('dump/src/wordenc/fragmentsenc.txt', fragment + '\n');
    }
}

// ----

{
    fs.writeFileSync('dump/src/wordenc/tldlist.txt', '');

    let total = tldlist.g4();
    for (let i = 0; i < total; i++) {
        let type = tldlist.g1();

        let tld = '';
        let count = tldlist.g1();
        for (let j = 0; j < count; j++) {
            tld += String.fromCharCode(tldlist.g1());
        }

        fs.appendFileSync('dump/src/wordenc/tldlist.txt', `${tld} ${type}\n`);
    }
}
