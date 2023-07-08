import fs from 'fs';
import { loadDir, loadPack } from '#lostcity/tools/pack/NameMap.js';
import { crawlConfigNames, regenPack } from '../server/packids.js';
import ParamType from "#lostcity/cache/ParamType.js";

fs.writeFileSync('data/pack/script.pack', regenPack(loadPack('data/pack/script.pack'), crawlConfigNames('.rs2', true)));

// ----

fs.mkdirSync('data/symbols', { recursive: true });

let constants = {};
loadDir('data/src/scripts', '.constant', (src) => {
    for (let i = 0; i < src.length; i++) {
        let parts = src[i].split('=');
        let name = parts[0].trim();
        let value = parts[1].trim();

        if (name.startsWith('^')) {
            name = name.substring(1);
        }

        constants[name] = value;
    }
});
let constantSymbols = '';
for (let name in constants) {
    constantSymbols += `${name}\t${constants[name]}\n`;
}
fs.writeFileSync('data/symbols/constant.tsv', constantSymbols);

let npcSymbols = '';
let npcs = loadPack('data/pack/npc.pack');
for (let i = 0; i < npcs.length; i++) {
    npcSymbols += `${i}\t${npcs[i]}\n`;
}
fs.writeFileSync('data/symbols/npc.tsv', npcSymbols);

let objSymbols = '';
let objs = loadPack('data/pack/obj.pack');
for (let i = 0; i < objs.length; i++) {
    objSymbols += `${i}\t${objs[i]}\n`;
}
fs.writeFileSync('data/symbols/obj.tsv', objSymbols);

let invSymbols = '';
let invs = loadPack('data/pack/inv.pack');
for (let i = 0; i < invs.length; i++) {
    if (!invs[i]) {
        continue;
    }

    invSymbols += `${i}\t${invs[i]}\n`;
}
fs.writeFileSync('data/symbols/inv.tsv', invSymbols);

let seqSymbols = '';
let seqs = loadPack('data/pack/seq.pack');
for (let i = 0; i < seqs.length; i++) {
    if (!seqs[i]) {
        continue;
    }

    seqSymbols += `${i}\t${seqs[i]}\n`;
}
fs.writeFileSync('data/symbols/seq.tsv', seqSymbols);

let locSymbols = '';
let locs = loadPack('data/pack/loc.pack');
for (let i = 0; i < locs.length; i++) {
    if (!locs[i]) {
        continue;
    }

    locSymbols += `${i}\t${locs[i]}\n`;
}
fs.writeFileSync('data/symbols/loc.tsv', locSymbols);

let comSymbols = '';
let coms = loadPack('data/pack/interface.pack');
for (let i = 0; i < coms.length; i++) {
    if (!coms[i] || coms[i] === 'null:null') {
        continue;
    }

    comSymbols += `${i}\t${coms[i]}\n`;
}
fs.writeFileSync('data/symbols/component.tsv', comSymbols);

let varpSymbols = '';
let vars = loadPack('data/pack/varp.pack');
for (let i = 0; i < vars.length; i++) {
    if (!vars[i]) {
        continue;
    }

    varpSymbols += `${i}\t${vars[i]}\tint\n`;
}
fs.writeFileSync('data/symbols/varp.tsv', varpSymbols);

let paramSymbols = '';
let params = loadPack('data/pack/param.pack');
for (let i = 0; i < params.length; i++) {
    if (!params[i]) {
        continue;
    }

    let config = ParamType.get(i);
    paramSymbols += `${i}\t${params[i]}\t${config.getType()}\n`;
}
fs.writeFileSync('data/symbols/param.tsv', paramSymbols);

let scriptSymbols = '';
let scripts = loadPack('data/pack/script.pack');
for (let i = 0; i < scripts.length; i++) {
    if (!scripts[i]) {
        continue;
    }

    scriptSymbols += `${i}\t${scripts[i]}\n`;
}
fs.writeFileSync('data/symbols/runescript.tsv', scriptSymbols);

let stats = [
    'attack', 'defence', 'strength', 'hitpoints', 'ranged', 'prayer',
    'magic', 'cooking', 'woodcutting', 'fletching', 'fishing', 'firemaking',
    'crafting', 'smithing', 'mining', 'herblore', 'agility', 'thieving',
    'stat18', 'stat19', 'runecraft'
];

fs.writeFileSync('data/symbols/stat.tsv', stats.map((name, index) => `${index}\t${name}`).join('\n') + '\n');

// ----

if (fs.existsSync('data/pack/server/scripts')) {
    fs.readdirSync('data/pack/server/scripts').forEach(file => {
        fs.unlinkSync(`data/pack/server/scripts/${file}`);
    });
}
