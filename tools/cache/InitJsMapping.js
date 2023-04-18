import fs from 'fs';

import LocationType from '#config/LocationType.js';
import NpcType from '#config/NpcType.js';
import ObjectType from '#config/ObjectType.js';

LocationType.fromJagConfig(fs.readFileSync('data/src/loc.def', 'utf8'));
NpcType.fromJagConfig(fs.readFileSync('data/src/npc.def', 'utf8'));
ObjectType.fromJagConfig(fs.readFileSync('data/src/obj.def', 'utf8'));

function safeName(name) {
    return name.trim().replaceAll(' ', '_').replaceAll('+', '_').replaceAll('-', '_').replaceAll('/', '_').replaceAll("'", '').replaceAll('(', '').replaceAll('&', '').replaceAll(')', '').replaceAll('.', '').replaceAll('__', '_');
}

function generateList(type, prefix = true) {
    let list = [];

    for (let i = 0; i < type.count; i++) {
        let def = type.get(i);
        if (!def.name) {
            list.push(null);
            continue;
        }

        let name = safeName(def.name);

        if (type == ObjectType && def.certlink != -1) {
            name = 'cert_' + name;
        }

        // if (prefix) {
        //     let op = def.ops.find(op => op);
        //     if (op) {
        //         name = safeName(op) + '_' + name;
        //     }

        //     if (type == ObjectType && !op) {
        //         let iop = def.iops.find(op => op);
        //         if (iop) {
        //             name = safeName(iop) + '_' + name;
        //         }
        //     }
        // }

        list.push(name.toLowerCase());
    }

    return list;
}

function renameList(list) {
    let newlist = {};

    for (let i = 0; i < list.length; i++) {
        let name = list[i];

        if (name != null && (newlist[name] || list.indexOf(name, i + 1) != -1 || list.indexOf(name) != i)) {
            let num = 1;
            while (newlist[name + num]) {
                num++;
            }
            name += num;
        } else if (name == null) {
            name = i.toString();
        }

        if (name[0] >= '0' && name[0] <= '9') {
            name = '_' + name;
        }

        newlist[name] = i;
    }

    return newlist;
}

let locs = renameList(generateList(LocationType));
let objs = renameList(generateList(ObjectType));
let npcs = renameList(generateList(NpcType));

function restructureList(type, list) {
    let names = Object.keys(list);

    let str = '';
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let id = list[name];
        let def = type.get(id);
    
        if (def.ops && def.ops.length && def.iops && def.iops.length) {
            str += `  ${name}: ${id}, // o: ${JSON.stringify(def.ops)} i: ${JSON.stringify(def.iops)}\n`;
        } else if (def.ops && def.ops.length) {
            str += `  ${name}: ${id}, // o: ${JSON.stringify(def.ops)}\n`;
        } else if (def.iops && def.iops.length) {
            str += `  ${name}: ${id}, // i: ${JSON.stringify(def.iops)}\n`;
        } else {
            str += `  ${name}: ${id},\n`;
        }
    }

    return str;
}

fs.writeFileSync('src/cache/locs.js', 'export default {\n');
fs.appendFileSync('src/cache/locs.js', restructureList(LocationType, locs));
fs.appendFileSync('src/cache/locs.js', '}\n');

fs.writeFileSync('src/cache/objs.js', 'export default {\n');
fs.appendFileSync('src/cache/objs.js', restructureList(ObjectType, objs));
fs.appendFileSync('src/cache/objs.js', '}\n');

fs.writeFileSync('src/cache/npcs.js', 'export default {\n');
fs.appendFileSync('src/cache/npcs.js', restructureList(NpcType, npcs));
fs.appendFileSync('src/cache/npcs.js', '}\n');
