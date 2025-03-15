import fs from 'fs';

import ObjType from '#/cache/config/ObjType.js';

ObjType.load('data/pack');

const all = [];
for (let i = 0; i < ObjType.count; i++) {
    const type = ObjType.get(i);

    if (type.tradeable && type.certtemplate === -1 && type.dummyitem === 0) {
        all.push({
            id: type.id,
            debugname: type.debugname,
            name: type.name,
            cost: type.cost
        });
    }
}

fs.writeFileSync('obj.json', JSON.stringify(all, null, 2));
