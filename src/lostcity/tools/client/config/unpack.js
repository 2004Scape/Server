import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import { loadPack } from '#lostcity/util/NameMap.js';

if (!fs.existsSync('dump/client/config')) {
    console.error('dump/client/config does not exist');
    process.exit(1);
}

fs.mkdirSync('dump/src/scripts', { recursive: true });
fs.mkdirSync('dump/pack', { recursive: true });

let config = Jagfile.load('dump/client/config');

// ----

let texturePack = loadPack('dump/pack/texture.pack');
let floPack = [];
let floConfig = [];

let flo = config.read('flo.dat');
let count = flo.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        floConfig.push('');
    }

    floPack.push(`flo_${id}`);
    floConfig.push(`[flo_${id}]`);

    while (true) {
        let code = flo.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            floConfig.push(`rgb=0x${flo.g3().toString(16).toUpperCase()}`);
        } else if (code === 2) {
            let texture = flo.g1();
            floConfig.push(`texture=${texturePack[texture]}`);
        } else if (code === 3) {
            floConfig.push('overlay=yes');
        } else if (code === 5) {
            floConfig.push('occlude=no');
        } else if (code === 6) {
            floConfig.push(`editname=${flo.gjstr()}`);
        } else {
            console.error(`Unrecognized flo config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/flo.pack', floPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.flo', floConfig.join('\n') + '\n');

// ----

let idkPack = [];
let idkConfig = [];

let idk = config.read('idk.dat');
count = idk.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        idkConfig.push('');
    }

    idkPack.push(`idk_${id}`);
    idkConfig.push(`[idk_${id}]`);

    while (true) {
        let code = idk.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            let type = idk.g1();

            switch (type) {
                case 0:
                    type = 'man_hair';
                    break;
                case 1:
                    type = 'man_jaw';
                    break;
                case 2:
                    type = 'man_torso';
                    break;
                case 3:
                    type = 'man_arms';
                    break;
                case 4:
                    type = 'man_hands';
                    break;
                case 5:
                    type = 'man_legs';
                    break;
                case 6:
                    type = 'man_feet';
                    break;
                case 7:
                    type = 'woman_hair';
                    break;
                case 8:
                    type = 'woman_jaw';
                    break;
                case 9:
                    type = 'woman_torso';
                    break;
                case 10:
                    type = 'woman_arms';
                    break;
                case 11:
                    type = 'woman_hands';
                    break;
                case 12:
                    type = 'woman_legs';
                    break;
                case 13:
                    type = 'woman_feet';
                    break;
            }

            idkConfig.push(`type=${type}`);
        } else if (code === 2) {
            let models = idk.g1();

            for (let i = 0; i < models; i++) {
                idkConfig.push(`model${i + 1}=model_${idk.g2()}`);
            }
        } else if (code === 3) {
            idkConfig.push('disable=yes');
        } else if (code >= 40 && code < 50) {
            idkConfig.push(`recol${code - 40 + 1}s=${idk.g2()}`);
        } else if (code >= 50 && code < 60) {
            idkConfig.push(`recol${code - 50 + 1}d=${idk.g2()}`);
        } else if (code >= 60 && code < 70) {
            idkConfig.push(`head${code - 60 + 1}=model_${idk.g2()}`);
        } else {
            console.error(`Unrecognized idk config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/idk.pack', idkPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.idk', idkConfig.join('\n') + '\n');

// ----

let locPack = [];
let locConfig = [];

let loc = config.read('loc.dat');
count = loc.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        locConfig.push('');
    }

    locPack.push(`loc_${id}`);
    locConfig.push(`[loc_${id}]`);

    while (true) {
        let code = loc.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            let models = loc.g1();

            for (let i = 0; i < models; i++) {
                let model = loc.g2();
                let shape = loc.g1();

                // shape is part of the model filename, but we can't control that right now
                switch (shape) {
                    case 10:
                        shape = 'centrepiece_straight';
                        break;
                    case 0:
                        shape = 'wall_straight';
                        break;
                    case 1:
                        shape = 'wall_diagonalcorner';
                        break;
                    case 2:
                        shape = 'wall_l';
                        break;
                    case 3:
                        shape = 'wall_squarecorner';
                        break;
                    case 9:
                        shape = 'wall_diagonal';
                        break;
                    case 4:
                        shape = 'walldecor_straight_nooffset';
                        break;
                    case 5:
                        shape = 'walldecor_straight_offset';
                        break;
                    case 6:
                        shape = 'walldecor_diagonal_nooffset';
                        break;
                    case 7:
                        shape = 'walldecor_diagonal_offset';
                        break;
                    case 8:
                        shape = 'walldecor_diagonal_both';
                        break;
                    case 11:
                        shape = 'centrepiece_diagonal';
                        break;
                    case 12:
                        shape = 'roof_straight';
                        break;
                    case 13:
                        shape = 'roof_diagonal_with_roofedge';
                        break;
                    case 14:
                        shape = 'roof_diagonal';
                        break;
                    case 15:
                        shape = 'roof_l_concave';
                        break;
                    case 16:
                        shape = 'roof_l_convex';
                        break;
                    case 17:
                        shape = 'roof_flat';
                        break;
                    case 18:
                        shape = 'roofedge_straight';
                        break;
                    case 19:
                        shape = 'roofedge_diagonalcorner';
                        break;
                    case 20:
                        shape = 'roofedge_l';
                        break;
                    case 21:
                        shape = 'roofedge_squarecorner';
                        break;
                    case 22:
                        shape = 'grounddecor';
                        break;
                }

                locConfig.push(`model${i + 1}=model_${model},${shape}`);
            }
        } else if (code === 2) {
            locConfig.push(`name=${loc.gjstr()}`);
        } else if (code === 3) {
            locConfig.push(`desc=${loc.gjstr()}`);
        } else if (code === 14) {
            locConfig.push(`width=${loc.g1()}`);
        } else if (code === 15) {
            locConfig.push(`length=${loc.g1()}`);
        } else if (code === 17) {
            locConfig.push('blockwalk=no');
        } else if (code === 18) {
            locConfig.push('blockrange=no');
        } else if (code === 19) {
            locConfig.push(`active=${loc.gbool() ? 'yes' : 'no'}`);
        } else if (code === 21) {
            locConfig.push('hillskew=yes');
        } else if (code === 22) {
            locConfig.push('sharelight=yes');
        } else if (code === 23) {
            locConfig.push('occlude=yes');
        } else if (code === 24) {
            locConfig.push(`anim=seq_${loc.g2()}`);
        } else if (code === 25) {
            locConfig.push('hasalpha=yes'); // TODO: inherit from anim
        } else if (code === 28) {
            locConfig.push(`walloff=${loc.g1()}`);
        } else if (code === 29) {
            locConfig.push(`ambient=${loc.g1s()}`);
        } else if (code === 39) {
            locConfig.push(`contrast=${loc.g1s()}`);
        } else if (code >= 30 && code < 39) {
            locConfig.push(`op${code - 30 + 1}=${loc.gjstr()}`);
        } else if (code === 40) {
            let recol = loc.g1();

            for (let i = 0; i < recol; i++) {
                locConfig.push(`recol${i + 1}s=${loc.g2()}`);
                locConfig.push(`recol${i + 1}d=${loc.g2()}`);
            }
        } else if (code === 60) {
            locConfig.push(`mapfunction=${loc.g2()}`);
        } else if (code === 62) {
            locConfig.push('mirror=yes');
        } else if (code === 64) {
            locConfig.push('shadow=no');
        } else if (code === 65) {
            locConfig.push(`resizex=${loc.g2()}`);
        } else if (code === 66) {
            locConfig.push(`resizey=${loc.g2()}`);
        } else if (code === 67) {
            locConfig.push(`resizez=${loc.g2()}`);
        } else if (code === 68) {
            locConfig.push(`mapscene=${loc.g2()}`);
        } else if (code === 69) {
            // north = 1
            // east = 2
            // south = 4
            // west = 8
            let flags = loc.g1();
            if ((flags & 0x1) === 0) {
                locConfig.push('forceapproach=north');
            } else if ((flags & 0x2) === 0) {
                locConfig.push('forceapproach=east');
            } else if ((flags & 0x4) === 0) {
                locConfig.push('forceapproach=south');
            } else if ((flags & 0x8) === 0) {
                locConfig.push('forceapproach=west');
            }
        } else if (code === 70) {
            locConfig.push(`xoff=${loc.g2s()}`);
        } else if (code === 71) {
            locConfig.push(`yoff=${loc.g2s()}`);
        } else if (code === 72) {
            locConfig.push(`zoff=${loc.g2s()}`);
        } else if (code === 73) {
            locConfig.push('forcedecor=yes');
        } else {
            console.error(`Unrecognized loc config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/loc.pack', locPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.loc', locConfig.join('\n') + '\n');

// ----

let npcPack = [];
let npcConfig = [];

let npc = config.read('npc.dat');
count = npc.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        npcConfig.push('');
    }

    npcPack.push(`flo_${id}`);
    npcConfig.push(`[flo_${id}]`);

    while (true) {
        let code = npc.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            let models = npc.g1();

            for (let i = 0; i < models; i++) {
                npcConfig.push(`model${i + 1}=model_${npc.g2()}`);
            }
        } else if (code === 2) {
            npcConfig.push(`name=${npc.gjstr()}`);
        } else if (code === 3) {
            npcConfig.push(`desc=${npc.gjstr()}`);
        } else if (code === 12) {
            npcConfig.push(`size=${npc.g1()}`);
        } else if (code === 13) {
            npcConfig.push(`readyanim=seq_${npc.g2()}`);
        } else if (code === 14) {
            npcConfig.push(`walkanim=seq_${npc.g2()}`);
        } else if (code === 16) {
            npcConfig.push('hasalpha=yes'); // TODO: inherit from anim
        } else if (code === 17) {
            npcConfig.push(`walkanims=seq_${npc.g2()},seq_${npc.g2()},seq_${npc.g2()},seq_${npc.g2()}`);
        } else if (code >= 30 && code < 40) {
            npcConfig.push(`op${code - 30 + 1}=${npc.gjstr()}`);
        } else if (code === 40) {
            let recol = npc.g1();

            for (let i = 0; i < recol; i++) {
                npcConfig.push(`recol${i + 1}s=${npc.g2()}`);
                npcConfig.push(`recol${i + 1}d=${npc.g2()}`);
            }
        } else if (code === 60) {
            let models = npc.g1();

            for (let i = 0; i < models; i++) {
                npcConfig.push(`head${i + 1}=model_${npc.g2()}`);
            }
        } else if (code === 90) {
            npcConfig.push(`code90=${npc.g2()}`);
        } else if (code === 91) {
            npcConfig.push(`code91=${npc.g2()}`);
        } else if (code === 92) {
            npcConfig.push(`code92=${npc.g2()}`);
        } else if (code === 93) {
            npcConfig.push('visonmap=no');
        } else if (code === 95) {
            let level = npc.g2();
            if (level === 0) {
                level = 'hide';
            }

            npcConfig.push(`vislevel=${level}`);
        } else if (code === 97) {
            npcConfig.push(`resizeh=${npc.g2()}`);
        } else if (code === 98) {
            npcConfig.push(`resizev=${npc.g2()}`);
        } else {
            console.error(`Unrecognized npc config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/npc.pack', npcPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.npc', npcConfig.join('\n') + '\n');

// ----

let objPack = [];
let objConfig = [];

let obj = config.read('obj.dat');
count = obj.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        objConfig.push('');
    }

    objPack.push(`obj_${id}`);
    objConfig.push(`[obj_${id}]`);

    while (true) {
        let code = obj.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            objConfig.push(`model=model_${obj.g2()}`);
        } else if (code === 2) {
            objConfig.push(`name=${obj.gjstr()}`);
        } else if (code === 3) {
            objConfig.push(`desc=${obj.gjstr()}`);
        } else if (code === 4) {
            objConfig.push(`2dzoom=${obj.g2()}`);
        } else if (code === 5) {
            objConfig.push(`2dxan=${obj.g2()}`);
        } else if (code === 6) {
            objConfig.push(`2dyan=${obj.g2()}`);
        } else if (code === 7) {
            objConfig.push(`2dxof=${obj.g2s()}`);
        } else if (code === 8) {
            objConfig.push(`2dyof=${obj.g2s()}`);
        } else if (code === 9) {
            objConfig.push('code9=yes');
        } else if (code === 10) {
            objConfig.push(`code10=seq_${obj.g2()}`);
        } else if (code === 11) {
            objConfig.push('stackable=yes');
        } else if (code === 12) {
            objConfig.push(`cost=${obj.g4()}`);
        } else if (code === 16) {
            objConfig.push('members=yes');
        } else if (code === 23) {
            objConfig.push(`manwear=model_${obj.g2()},${obj.g1()}`);
        } else if (code === 24) {
            objConfig.push(`manwear2=model_${obj.g2()}`);
        } else if (code === 25) {
            objConfig.push(`womanwear=model_${obj.g2()},${obj.g1()}`);
        } else if (code === 26) {
            objConfig.push(`womanwear2=model_${obj.g2()}`);
        } else if (code >= 30 && code < 35) {
            objConfig.push(`op${code - 30 + 1}=${obj.gjstr()}`);
        } else if (code >= 35 && code < 40) {
            objConfig.push(`iop${code - 35 + 1}=${obj.gjstr()}`);
        } else if (code === 40) {
            let recol = obj.g1();

            for (let i = 0; i < recol; i++) {
                objConfig.push(`recol${i + 1}s=${obj.g2()}`);
                objConfig.push(`recol${i + 1}d=${obj.g2()}`);
            }
        } else if (code === 78) {
            objConfig.push(`manwear3=model_${obj.g2()}`);
        } else if (code === 79) {
            objConfig.push(`womanwear3=model_${obj.g2()}`);
        } else if (code === 90) {
            objConfig.push(`manhead=model_${obj.g2()}`);
        } else if (code === 91) {
            objConfig.push(`womanhead=model_${obj.g2()}`);
        } else if (code === 92) {
            objConfig.push(`manhead2=model_${obj.g2()}`);
        } else if (code === 93) {
            objConfig.push(`womanhead2=model_${obj.g2()}`);
        } else if (code === 95) {
            objConfig.push(`2dzan=${obj.g2()}`);
        } else if (code === 97) {
            objConfig.push(`certlink=obj_${obj.g2()}`);
        } else if (code === 98) {
            objConfig.push(`certtemplate=obj_${obj.g2()}`);
        } else if (code >= 100 && code < 110) {
            objConfig.push(`count${code - 100 + 1}=obj_${obj.g2()},${obj.g2()}`);
        } else {
            console.error(`Unrecognized obj config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/obj.pack', objPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.obj', objConfig.join('\n') + '\n');

// ----

let seqPack = [];
let seqConfig = [];

let seq = config.read('seq.dat');
count = seq.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        seqConfig.push('');
    }

    seqPack.push(`seq_${id}`);
    seqConfig.push(`[seq_${id}]`);

    while (true) {
        let code = seq.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            let frames = seq.g1();

            let frame = [];
            let iframe = [];
            let delay = [];
            for (let j = 0; j < frames; j++) {
                frame.push(seq.g2());
                iframe.push(seq.g2());
                delay.push(seq.g2());
            }

            for (let j = 0; j < frames; j++) {
                seqConfig.push(`frame${j + 1}=anim_${frame[j]}`);

                if (delay[j] !== 0) {
                    seqConfig.push(`delay${j + 1}=${delay[j]}`);
                }
            }

            for (let j = 0; j < frames; j++) {
                if (iframe[j] === 65535) {
                    continue;
                }

                seqConfig.push(`iframe${j + 1}=anim_${iframe[j]}`);
            }
        } else if (code === 2) {
            seqConfig.push(`replayoff=${seq.g2()}`);
        } else if (code === 3) {
            let labels = seq.g1();

            let str = '';
            for (let i = 0; i < labels; i++) {
                if (i > 0) {
                    str += ',';
                }

                str += `label_${seq.g1()}`;
            }

            seqConfig.push(`walkmerge=${str}`);
        } else if (code === 4) {
            seqConfig.push('stretches=yes');
        } else if (code === 5) {
            seqConfig.push(`priority=${seq.g1()}`);
        } else if (code === 6) {
            let obj = seq.g2();
            if (obj === 0) {
                obj = 'hide';
            } else {
                obj = `obj_${obj - 512}`;
            }

            seqConfig.push(`mainhand=${obj}`);
        } else if (code === 7) {
            let obj = seq.g2();
            if (obj === 0) {
                obj = 'hide';
            } else {
                obj = `obj_${obj - 512}`;
            }

            seqConfig.push(`offhand=${obj}`);
        } else if (code === 8) {
            seqConfig.push(`replaycount=${seq.g1()}`);
        } else {
            console.error(`Unrecognized seq config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/seq.pack', seqPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.seq', seqConfig.join('\n') + '\n');

// ----

let spotanimPack = [];
let spotanimConfig = [];

let spotanim = config.read('spotanim.dat');
count = spotanim.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        spotanimConfig.push('');
    }

    spotanimPack.push(`spotanim_${id}`);
    spotanimConfig.push(`[spotanim_${id}]`);

    while (true) {
        let code = spotanim.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            spotanimConfig.push(`model=model_${spotanim.g2()}`);
        } else if (code === 2) {
            spotanimConfig.push(`anim=seq_${spotanim.g2()}`);
        } else if (code === 3) {
            spotanimConfig.push('hasalpha=yes'); // TODO: inherit from anim
        } else if (code === 4) {
            spotanimConfig.push(`resizeh=${spotanim.g2()}`);
        } else if (code === 5) {
            spotanimConfig.push(`resizev=${spotanim.g2()}`);
        } else if (code === 6) {
            spotanimConfig.push(`orientation=${spotanim.g2()}`);
        } else if (code === 7) {
            spotanimConfig.push(`ambient=${spotanim.g1()}`);
        } else if (code === 8) {
            spotanimConfig.push(`contrast=${spotanim.g1()}`);
        } else if (code >= 40 && code < 50) {
            spotanimConfig.push(`recol${code - 40 + 1}s=${spotanim.g2()}`);
        } else if (code >= 50 && code < 60) {
            spotanimConfig.push(`recol${code - 50 + 1}d=${spotanim.g2()}`);
        } else {
            console.error(`Unrecognized spotanim config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/spotanim.pack', spotanimPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.spotanim', spotanimConfig.join('\n') + '\n');

// ----

let varpPack = [];
let varpConfig = [];

let varp = config.read('varp.dat');
count = varp.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        varpConfig.push('');
    }

    varpPack.push(`varp_${id}`);
    varpConfig.push(`[varp_${id}]`);

    while (true) {
        let code = varp.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            varpConfig.push(`code1=${varp.g1()}`);
        } else if (code === 2) {
            varpConfig.push(`code2=${varp.g1()}`);
        } else if (code === 3) {
            varpConfig.push('code3=yes');
        } else if (code === 4) {
            varpConfig.push('code4=no');
        } else if (code === 5) {
            varpConfig.push(`clientcode=${varp.g2()}`);
        } else if (code === 6) {
            varpConfig.push('code6=yes');
        } else if (code === 7) {
            varpConfig.push(`code7=${varp.g4()}`);
        } else if (code === 8) {
            varpConfig.push('code8=yes');
        } else if (code === 10) {
            varpConfig.push(`code10=${varp.gjstr()}`);
        } else {
            console.error(`Unrecognized varp config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/varp.pack', varpPack.map((name, id) => `${id}=${name}`).filter(x => x).join('\n') + '\n');
fs.writeFileSync('dump/src/scripts/all.varp', varpConfig.join('\n') + '\n');
