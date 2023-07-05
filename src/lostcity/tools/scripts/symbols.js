import fs from 'fs';
import { loadPack } from '#lostcity/tools/pack/NameMap.js';

fs.mkdirSync('data/symbols', { recursive: true });
fs.writeFileSync('data/symbols/constants.tsv', '');

let npcSymbols = '';
let npcs = loadPack('data/pack/npc.pack');
for (let i = 0; i < npcs.length; i++) {
    npcSymbols += `${i}\t${npcs[i]}\n`;
}
fs.writeFileSync('data/symbols/npcs.tsv', npcSymbols);

let objSymbols = '';
let objs = loadPack('data/pack/obj.pack');
for (let i = 0; i < objs.length; i++) {
    objSymbols += `${i}\t${objs[i]}\n`;
}
fs.writeFileSync('data/symbols/objs.tsv', objSymbols);

let invSymbols = '';
let invs = loadPack('data/pack/inv.pack');
for (let i = 0; i < invs.length; i++) {
    if (!invs[i]) {
        continue;
    }

    invSymbols += `${i}\t${invs[i]}\n`;
}
fs.writeFileSync('data/symbols/invs.tsv', invSymbols);

let scriptSymbols = '';
let scripts = loadPack('data/pack/script.pack');
for (let i = 0; i < scripts.length; i++) {
    if (!scripts[i]) {
        continue;
    }

    scriptSymbols += `${i}\t${scripts[i]}\n`;
}
fs.writeFileSync('data/symbols/scripts.tsv', scriptSymbols);

let stats = [
    'attack', 'defence', 'strength', 'hitpoints', 'ranged', 'prayer',
    'magic', 'cooking', 'woodcutting', 'fletching', 'fishing', 'firemaking',
    'crafting', 'smithing', 'mining', 'herblore', 'agility', 'thieving',
    'stat18', 'stat19', 'runecraft'
];

fs.writeFileSync('data/symbols/stats.tsv', stats.map((name, index) => `${index}\t${name}`).join('\n') + '\n');
