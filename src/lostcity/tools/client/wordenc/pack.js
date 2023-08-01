import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';

console.log('Packing wordenc.jag');
//console.time('wordenc.jag');

/* order:
  'badenc.txt', 'fragmentsenc.txt', 'tldlist.txt', 'domainenc.txt'
*/

let jag = new Jagfile();

{
    let badenc = fs.readFileSync('data/src/wordenc/badenc.txt', 'ascii').replace(/\r/g, '').split('\n').filter(x => x.length);

    let out = new Packet();
    out.p4(badenc.length);
    for (let i = 0; i < badenc.length; i++) {
        let [word, ...combinations] = badenc[i].split(' ');

        out.p1(word.length);
        for (let j = 0; j < word.length; j++) {
            out.p1(word.charCodeAt(j));
        }

        out.p1(combinations.length);
        for (let j = 0; j < combinations.length; j++) {
            let [a, b] = combinations[j].split(':');
            out.p1(a);
            out.p1(b);
        }
    }

    jag.write('badenc.txt', out);
}

{
    let fragmentsenc = fs.readFileSync('data/src/wordenc/fragmentsenc.txt', 'ascii').replace(/\r/g, '').split('\n').filter(x => x.length);

    let out = new Packet();
    out.p4(fragmentsenc.length);
    for (let i = 0; i < fragmentsenc.length; i++) {
        let fragment = Number(fragmentsenc[i]);

        out.p2(fragment);
    }

    jag.write('fragmentsenc.txt', out);
}

{
    let tldlist = fs.readFileSync('data/src/wordenc/tldlist.txt', 'ascii').replace(/\r/g, '').split('\n').filter(x => x.length);

    let out = new Packet();
    out.p4(tldlist.length);
    for (let i = 0; i < tldlist.length; i++) {
        let [tld, type] = tldlist[i].split(' ');

        out.p1(type);

        out.p1(tld.length);
        for (let j = 0; j < tld.length; j++) {
            out.p1(tld.charCodeAt(j));
        }
    }

    jag.write('tldlist.txt', out);
}

{
    let domainenc = fs.readFileSync('data/src/wordenc/domainenc.txt', 'ascii').replace(/\r/g, '').split('\n').filter(x => x.length);

    let out = new Packet();
    out.p4(domainenc.length);
    for (let i = 0; i < domainenc.length; i++) {
        let domain = domainenc[i];

        out.p1(domain.length);
        for (let j = 0; j < domain.length; j++) {
            out.p1(domain.charCodeAt(j));
        }
    }

    jag.write('domainenc.txt', out);
}

jag.save('data/pack/client/wordenc');
//console.timeEnd('wordenc.jag');
