import fs from 'fs';
import Jimp from 'jimp';

import FileStream from '#jagex2/io/FileStream.js';
import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';

import { countPix, pixSize, unpackPix } from '#lostcity/util/PixUnpack.js';

export function readJag(cache: FileStream, id: number): Jagfile | null {
    const raw = cache.read(0, id);
    if (!raw) {
        return null;
    }

    return new Jagfile(new Packet(raw));
}

function unpackImage(dat: Packet | null, idx: Packet | null, id: number = 0) {
    if (!dat || !idx) {
        return;
    }

    return unpackPix(dat, idx, id);
}

function saveImage(img: Jimp | undefined, file: string) {
    if (!img || !file) {
        return;
    }

    img.write(file + '.png');
}

function unpackAndSaveImage(jag: Jagfile, idx: Packet | null, file: string, outDir: string) {
    if (!idx) {
        return;
    }

    const dat = jag.read(file + '.dat');
    if (!dat) {
        return;
    }

    const unpacked = unpackImage(dat, idx);
    if (unpacked) {
        saveImage(unpacked.img, 'data/src/' + outDir + '/' + file);

        // ----

        if (!fs.existsSync('data/src/' + outDir + '/meta')) {
            fs.mkdirSync('data/src/' + outDir + '/meta', { recursive: true });
        }

        const meta = `${unpacked.cropX},${unpacked.cropY},${unpacked.width},${unpacked.height},${unpacked.pixelOrder ? 'row' : 'column'}\n`;
        fs.writeFileSync('data/src/' + outDir + '/meta/' + file + '.opt', meta);

        // ----

        const pal = new Jimp(16, 16, 0xff00ffff).colorType(2);

        for (let j = 1; j < unpacked.palette.length; j++) {
            const x = j % 16;
            const y = Math.floor(j / 16);

            const color = unpacked.palette[j];

            const pos = (x + y * 16) * 4;
            pal.bitmap.data[pos] = (color >> 16) & 0xff;
            pal.bitmap.data[pos + 1] = (color >> 8) & 0xff;
            pal.bitmap.data[pos + 2] = color & 0xff;
        }

        saveImage(pal, 'data/src/' + outDir + '/meta/' + file + '.pal');
    }
}

function unpackAndSaveSheet(jag: Jagfile, idx: Packet | null, file: string, outDir: string) {
    if (!idx) {
        return;
    }

    const dat = jag.read(file + '.dat');
    if (!dat) {
        return;
    }

    const size = pixSize(dat, idx);
    const count = countPix(dat, idx);

    const sprites = [];
    for (let i = 0; i < count; i++) {
        sprites[i] = unpackPix(dat, idx, i);
    }

    let width = Math.ceil(Math.sqrt(count));
    let height = Math.ceil(count / width);

    if (width * height > count) {
        let widthTries = 0;

        // wrong aspect ratio, try subtracting from width and adding to height
        while (width * height > count && widthTries < 10) {
            width--;
            height++;
            widthTries++;
        }
    }

    const sheet = new Jimp(width * size.width, height * size.height, 0xff00ffff).colorType(2);

    for (let j = 0; j < count; j++) {
        const x = j % width;
        const y = Math.floor(j / width);

        sheet.blit(sprites[j].img, x * size.width, y * size.height, 0, 0, size.width, size.height);
    }

    saveImage(sheet, 'data/src/' + outDir + '/' + file);

    // ----

    if (!fs.existsSync('data/src/' + outDir + '/meta')) {
        fs.mkdirSync('data/src/' + outDir + '/meta', { recursive: true });
    }

    let meta = `${size.width}x${size.height}\n`;

    for (let j = 0; j < count; j++) {
        const sprite = sprites[j];
        meta += `${sprite.cropX},${sprite.cropY},${sprite.width},${sprite.height},${sprite.pixelOrder ? 'row' : 'column'}\n`;
    }

    fs.writeFileSync('data/src/' + outDir + '/meta/' + file + '.opt', meta);

    // ----

    const pal = new Jimp(16, 16, 0xff00ffff).colorType(2);

    for (let j = 1; j < sprites[0].palette.length; j++) {
        const x = j % 16;
        const y = Math.floor(j / 16);

        const color = sprites[0].palette[j];

        const pos = (x + y * 16) * 4;
        pal.bitmap.data[pos] = (color >> 16) & 0xff;
        pal.bitmap.data[pos + 1] = (color >> 8) & 0xff;
        pal.bitmap.data[pos + 2] = color & 0xff;
    }

    saveImage(pal, 'data/src/' + outDir + '/meta/' + file + '.pal');
}

export function unpackAndSave(jag: Jagfile, idx: Packet | null, file: string, outDir: string) {
    if (!idx) {
        return;
    }

    const dat = jag.read(file + '.dat');
    if (!dat) {
        return;
    }

    const count = countPix(dat, idx);
    if (count === 1) {
        unpackAndSaveImage(jag, idx, file, outDir);
    } else {
        unpackAndSaveSheet(jag, idx, file, outDir);
    }
}

export function unpackTitle(title: Jagfile | null) {
    if (!title) {
        return;
    }

    const titleJpg = title.read('title.dat');
    if (titleJpg) {
        titleJpg.save('data/src/binary/title.jpg', titleJpg.length);
    }

    const index = title.read('index.dat');

    unpackAndSave(title, index, 'logo', 'title');
    unpackAndSave(title, index, 'titlebox', 'title');
    unpackAndSave(title, index, 'titlebutton', 'title');
    unpackAndSave(title, index, 'runes', 'title');
    unpackAndSave(title, index, 'p11_full', 'fonts');
    unpackAndSave(title, index, 'p12_full', 'fonts');
    unpackAndSave(title, index, 'b12_full', 'fonts');
    unpackAndSave(title, index, 'q8_full', 'fonts');
}

export function unpackMedia(media: Jagfile | null) {
    if (!media) {
        return;
    }

    const index = media.read('index.dat');

    unpackAndSave(media, index, 'backbase1', 'sprites');
    unpackAndSave(media, index, 'backbase2', 'sprites');
    unpackAndSave(media, index, 'backhmid1', 'sprites');
    unpackAndSave(media, index, 'backhmid2', 'sprites');
    unpackAndSave(media, index, 'backleft1', 'sprites');
    unpackAndSave(media, index, 'backleft2', 'sprites');
    unpackAndSave(media, index, 'backright1', 'sprites');
    unpackAndSave(media, index, 'backright2', 'sprites');
    unpackAndSave(media, index, 'backtop1', 'sprites');
    unpackAndSave(media, index, 'backvmid1', 'sprites');
    unpackAndSave(media, index, 'backvmid2', 'sprites');
    unpackAndSave(media, index, 'backvmid3', 'sprites');
    unpackAndSave(media, index, 'mapback', 'sprites');
    unpackAndSave(media, index, 'chatback', 'sprites');
    unpackAndSave(media, index, 'invback', 'sprites');
    unpackAndSave(media, index, 'magicon', 'sprites');
    unpackAndSave(media, index, 'magicoff', 'sprites');
    unpackAndSave(media, index, 'prayeron', 'sprites');
    unpackAndSave(media, index, 'prayeroff', 'sprites');
    unpackAndSave(media, index, 'prayerglow', 'sprites');
    unpackAndSave(media, index, 'wornicons', 'sprites');
    unpackAndSave(media, index, 'sideicons', 'sprites');
    unpackAndSave(media, index, 'compass', 'sprites');
    unpackAndSave(media, index, 'miscgraphics', 'sprites');
    unpackAndSave(media, index, 'miscgraphics2', 'sprites');
    unpackAndSave(media, index, 'miscgraphics3', 'sprites');
    unpackAndSave(media, index, 'staticons', 'sprites');
    unpackAndSave(media, index, 'staticons2', 'sprites');
    unpackAndSave(media, index, 'combaticons', 'sprites');
    unpackAndSave(media, index, 'combaticons2', 'sprites');
    unpackAndSave(media, index, 'combaticons3', 'sprites');
    unpackAndSave(media, index, 'combatboxes', 'sprites');
    unpackAndSave(media, index, 'tradebacking', 'sprites');
    unpackAndSave(media, index, 'hitmarks', 'sprites');
    unpackAndSave(media, index, 'cross', 'sprites');
    unpackAndSave(media, index, 'mapdots', 'sprites');
    unpackAndSave(media, index, 'sworddecor', 'sprites');
    unpackAndSave(media, index, 'redstone1', 'sprites');
    unpackAndSave(media, index, 'redstone2', 'sprites');
    unpackAndSave(media, index, 'redstone3', 'sprites');
    unpackAndSave(media, index, 'leftarrow', 'sprites');
    unpackAndSave(media, index, 'rightarrow', 'sprites');
    unpackAndSave(media, index, 'steelborder', 'sprites');
    unpackAndSave(media, index, 'steelborder2', 'sprites');
    unpackAndSave(media, index, 'scrollbar', 'sprites');
    unpackAndSave(media, index, 'mapscene', 'sprites');
    unpackAndSave(media, index, 'mapfunction', 'sprites');
    unpackAndSave(media, index, 'magicon2', 'sprites');
    unpackAndSave(media, index, 'magicoff2', 'sprites');
    unpackAndSave(media, index, 'gnomeball_buttons', 'sprites');
    unpackAndSave(media, index, 'mapmarker', 'sprites');
    unpackAndSave(media, index, 'mod_icons', 'sprites');
    unpackAndSave(media, index, 'mapedge', 'sprites');
    unpackAndSave(media, index, 'leftarrow_small', 'sprites');
    unpackAndSave(media, index, 'rightarrow_small', 'sprites');
    unpackAndSave(media, index, 'blackmark', 'sprites');
    unpackAndSave(media, index, 'button_brown', 'sprites');
    unpackAndSave(media, index, 'button_red', 'sprites');
    unpackAndSave(media, index, 'chest', 'sprites');
    unpackAndSave(media, index, 'coins', 'sprites');
    unpackAndSave(media, index, 'key', 'sprites');
    unpackAndSave(media, index, 'keys', 'sprites');
    unpackAndSave(media, index, 'pen', 'sprites');
    unpackAndSave(media, index, 'startgame', 'sprites');
    unpackAndSave(media, index, 'titlescroll', 'sprites');
    unpackAndSave(media, index, 'letter', 'sprites');
    unpackAndSave(media, index, 'button_brown_big', 'sprites');
    unpackAndSave(media, index, 'headicons_pk', 'sprites');
    unpackAndSave(media, index, 'headicons_prayer', 'sprites');
    unpackAndSave(media, index, 'headicons_hint', 'sprites');
    unpackAndSave(media, index, 'overlay_multiway', 'sprites');
    unpackAndSave(media, index, 'overlay_duel', 'sprites');
    unpackAndSave(media, index, 'tex_brown', 'sprites');
    unpackAndSave(media, index, 'tex_red', 'sprites');
    unpackAndSave(media, index, 'number_button', 'sprites');
}

export function unpackTextures(textures: Jagfile | null) {
    if (!textures) {
        return null;
    }

    const index = textures.read('index.dat');

    for (let i = 0; i < 50; i++) {
        unpackAndSave(textures, index, i.toString(), 'textures');
    }
}

export function unpackConfig(jag: Jagfile | null, name: string, decoder: (dat: Packet, code: number) => string | string[] | null) {
    if (!jag) {
        return;
    }

    const dat = jag.read(name + '.dat');
    if (!dat) {
        return;
    }

    const packOut = 'data/src/pack/' + name + '.pack';
    fs.mkdirSync('data/src/pack', { recursive: true });
    fs.writeFileSync(packOut, '');

    const srcOut = 'data/src/scripts/_unpack/all.' + name;
    fs.mkdirSync('data/src/scripts/_unpack', { recursive: true });
    fs.writeFileSync(srcOut, '');

    const count: number = dat.g2();
    for (let id = 0; id < count; id++) {
        if (id > 0) {
            fs.appendFileSync(srcOut, '\n');
        }

        fs.appendFileSync(packOut, id + '=' + name + '_' + id + '\n');

        const src: string[] = [];
        src.push('[' + name + '_' + id + ']');

        while (true) {
            const code = dat.g1();
            if (code === 0) {
                break;
            }

            const out = decoder(dat, code);
            if (out === null) {
                console.log('Unrecognized ' + name + ' config code: ' + code);
                process.exit(1);
            }

            if (Array.isArray(out)) {
                src.push(...out);
            } else if (out.length > 0) {
                src.push(out);
            }
        }

        fs.appendFileSync(srcOut, src.join('\n') + '\n');
    }

    console.log(count, name + ' configs unpacked');
}


enum LocShape {
    wall_straight,
    wall_diagonalcorner,
    wall_l,
    wall_squarecorner,
    walldecor_straight_nooffset,
    walldecor_straight_offset,
    walldecor_diagonal_nooffset,
    walldecor_diagonal_offset,
    walldecor_diagonal_both,
    wall_diagonal,
    centrepiece_straight,
    centrepiece_diagonal,
    roof_straight,
    roof_diagonal_with_roofedge,
    roof_diagonal,
    roof_l_concave,
    roof_l_convex,
    roof_flat,
    roofedge_straight,
    roofedge_diagonalcorner,
    roofedge_l,
    roofedge_squarecorner,
    grounddecor,
}

export function decodeLoc(dat: Packet, code: number) {
    if (code === 1 || code === 5) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const id = dat.g2();
            let shape = 10;

            if (code === 1) {
                shape = dat.g1();
            }

            out.push('model' + (i + 1) + '=model_' + id + ',' + LocShape[shape]);
        }

        return out;
    } else if (code === 2) {
        const value = dat.gjstr();
        return 'name=' + value;
    } else if (code === 3) {
        const value = dat.gjstr();
        return 'desc=' + value;
    } else if (code === 14) {
        const value = dat.g1();
        return 'width=' + value;
    } else if (code === 15) {
        const value = dat.g1();
        return 'length=' + value;
    } else if (code === 17) {
        return 'blockwalk=no';
    } else if (code === 18) {
        return 'blockrange=no';
    } else if (code === 19) {
        const value = dat.gbool();
        return 'active=' + (value ? 'yes' : 'no');
    } else if (code === 21) {
        return 'hillskew=yes';
    } else if (code === 22) {
        return 'sharelight=yes';
    } else if (code === 23) {
        return 'occlude=yes';
    } else if (code === 24) {
        const id = dat.g2();
        return 'anim=seq_' + id;
    } else if (code === 25) {
        return 'hasalpha=yes';
    } else if (code === 28) {
        const value = dat.g1();
        return 'wallwidth=' + value;
    } else if (code === 29) {
        const value = dat.g1b();
        return 'ambient=' + value;
    } else if (code === 39) {
        const value = dat.g1b();
        return 'contrast=' + value;
    } else if (code >= 30 && code < 39) {
        const value = dat.gjstr();

        const index = code - 30;
        return 'op' + (index + 1) + '=' + value;
    } else if (code === 40) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const src = dat.g2();
            const dst = dat.g2();

            out.push('recol' + (i + 1) + 's=' + src);
            out.push('recol' + (i + 1) + 'd=' + dst);
        }

        return out;
    } else if (code === 41) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const src = dat.g2();
            const dst = dat.g2();

            out.push('//unsupported: retex' + (i + 1) + 's=' + src);
            out.push('//unsupported: retex' + (i + 1) + 'd=' + dst);
        }

        return out;
    } else if (code === 60 || code === 82) {
        const value = dat.g2();
        return 'mapfunction=' + value;
    } else if (code === 62) {
        return 'mirror=yes';
    } else if (code === 64) {
        return 'shadow=no';
    } else if (code === 65) {
        const value = dat.g2();
        return 'resizex=' + value;
    } else if (code === 66) {
        const value = dat.g2();
        return 'resizey=' + value;
    } else if (code === 67) {
        const value = dat.g2();
        return 'resizez=' + value;
    } else if (code === 68) {
        const value = dat.g2();
        return 'mapscene=' + value;
    } else if (code === 69) {
        const flags = dat.g1();

        if ((flags & 0x1) === 0) {
            return 'forceapproach=north';
        } else if ((flags & 0x2) === 0) {
            return 'forceapproach=east';
        } else if ((flags & 0x4) === 0) {
            return 'forceapproach=south';
        } else if ((flags & 0x8) === 0) {
            return 'forceapproach=west';
        }
    } else if (code === 70) {
        const value = dat.g2s();
        return 'xoff=' + value;
    } else if (code === 71) {
        const value = dat.g2s();
        return 'yoff=' + value;
    } else if (code === 72) {
        const value = dat.g2s();
        return 'zoff=' + value;
    } else if (code === 73) {
        return 'forcedecor=yes';
    } else if (code === 74) {
        return '//unsupported: breakroutefinding=yes';
    } else if (code === 75) {
        const value = dat.gbool();
        return '//unsupported: raiseobject=' + (value ? 'yes' : 'no');
    } else if (code === 77 || code === 92) {
        const out: string[] = [];

        let multiLocVarbit = dat.g2();
        if (multiLocVarbit === 65535) {
            multiLocVarbit = -1;
        }

        if (multiLocVarbit !== -1) {
            out.push('//unsupported: multivar=varbit_' + multiLocVarbit);
        }

        let multiLocVarp = dat.g2();
        if (multiLocVarp === 65535) {
            multiLocVarp = -1;
        }

        if (multiLocVarp !== -1) {
            out.push('//unsupported: multivar=varp_' + multiLocVarp);
        }

        let defaultMultiLoc: number = -1;
        if (code === 92) {
            defaultMultiLoc = dat.g2();

            if (defaultMultiLoc === 65535) {
                defaultMultiLoc = -1;
            }
        }

        const count: number = dat.g1();
        const multiLocs = new Int32Array(count + 1);

        for (let i: number = 0; i <= count; i++) {
            multiLocs[i] = dat.g2();

            if (multiLocs[i] === 65535) {
                multiLocs[i] = -1;
            }
        }

        multiLocs[count + 1] = defaultMultiLoc;

        if (defaultMultiLoc !== -1) {
            out.push('//unsupported: defaultloc=loc_' + defaultMultiLoc);
        }

        for (let i: number = 0; i <= count; i++) {
            if (multiLocs[i] !== -1) {
                out.push('//unsupported: multiloc=' + i + ',loc_' + multiLocs[i]);
            }
        }

        return out;
    } else if (code === 78) {
        const id = dat.g2();
        const value2 = dat.g1();
        return '//unsupported: bgsound=sound_' + id + ',' + value2;
    } else if (code === 79) {
        const out: string[] = [];
        out.push('//unsupported: randomsound=' + dat.g2() + ',' + dat.g2() + ',' + dat.g1());

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const id = dat.g2();
            out.push('//unsupported: randomsound' + (i + 1) + '=sound_' + id);
        }

        out.push('//unsupported: bgsound=sound_' + dat.g2() + ',' + dat.g1());
        return out;
    } else if (code === 81) {
        const value = dat.g1();
        return '//unsupported: treeskew=' + value;
    }

    return null;
}

export function decodeNpc(dat: Packet, code: number) {
    if (code === 1) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const id = dat.g2();
            out.push('model' + (i + 1) + '=model_' + id);
        }

        return out;
    } else if (code === 2) {
        const value = dat.gjstr();
        return 'name=' + value;
    } else if (code === 3) {
        const value = dat.gjstr();
        return 'desc=' + value;
    } else if (code === 12) {
        const value = dat.g1();
        return 'size=' + value;
    } else if (code === 13) {
        const id = dat.g2();
        return 'readyanim=seq_' + id;
    } else if (code === 14) {
        const id = dat.g2();
        return 'walkanim=seq_' + id;
    } else if (code === 16) {
        return 'hasalpha=yes';
    } else if (code === 17) {
        const front = dat.g2();
        const back = dat.g2();
        const right = dat.g2();
        const left = dat.g2();

        return 'walkanim=seq_' + front + ',seq_' + back + ',seq_' + right + ',seq_' + left;
    } else if (code >= 30 && code < 40) {
        const value = dat.gjstr();

        const index = code - 30;
        return 'op' + (index + 1) + '=' + value;
    } else if (code === 40) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const src = dat.g2();
            const dst = dat.g2();

            out.push('recol' + (i + 1) + 's=' + src);
            out.push('recol' + (i + 1) + 'd=' + dst);
        }

        return out;
    } else if (code === 60) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const id = dat.g2();
            out.push('head' + (i + 1) + '=model_' + id);
        }

        return out;
    } else if (code === 90) {
        const value = dat.g2();
        return 'code90=' + value;
    } else if (code === 91) {
        const value = dat.g2();
        return 'code91=' + value;
    } else if (code === 92) {
        const value = dat.g2();
        return 'code92=' + value;
    } else if (code === 93) {
        return 'minimap=no';
    } else if (code === 95) {
        const value = dat.g2();

        if (value === 0) {
            return 'vislevel=hide';
        }

        return 'vislevel=' + value;
    } else if (code === 97) {
        const value = dat.g2();
        return 'resizeh=' + value;
    } else if (code === 98) {
        const value = dat.g2();
        return 'resizev=' + value;
    } else if (code === 99) {
        return '//unsupported: alwaysontop=yes';
    } else if (code === 100) {
        const value = dat.g1b();
        return '//unsupported: ambient=' + value;
    } else if (code === 101) {
        const value = dat.g1b();
        return '//unsupported: contrast=' + value;
    } else if (code === 102) {
        const value = dat.g2();
        return '//unsupported: headicon=' + value;
    } else if (code === 103) {
        const value = dat.g2();
        return '//unsupported: turnspeed=' + value;
    } else if (code === 106) {
        const out: string[] = [];

        let multiNpcVarbit = dat.g2();
        if (multiNpcVarbit === 65535) {
            multiNpcVarbit = -1;
        }

        if (multiNpcVarbit !== -1) {
            out.push('//unsupported: multivar=varbit_' + multiNpcVarbit);
        }

        let multiNpcVarp = dat.g2();
        if (multiNpcVarp === 65535) {
            multiNpcVarp = -1;
        }

        if (multiNpcVarp !== -1) {
            out.push('//unsupported: multivar=varp_' + multiNpcVarp);
        }

        const count: number = dat.g1();
        const multiNpcs = new Int32Array(count + 1);

        for (let i: number = 0; i <= count; i++) {
            multiNpcs[i] = dat.g2();
            if (multiNpcs[i] === 65535) {
                multiNpcs[i] = -1;
            }
        }

        for (let i: number = 0; i <= count; i++) {
            if (multiNpcs[i] !== -1) {
                out.push('//unsupported: multinpc' + (i + 1) + '=npc_' + multiNpcs[i]);
            }
        }

        return out;
    } else if (code === 107) {
        return '//unsupported: active=no';
    }

    return null;
}

export function decodeObj(dat: Packet, code: number) {
    if (code === 1) {
        const id = dat.g2();
        return 'model=model_' + id;
    } else if (code === 2) {
        const value = dat.gjstr();
        return 'name=' + value;
    } else if (code === 3) {
        const value = dat.gjstr();
        return 'desc=' + value;
    } else if (code === 4) {
        const value = dat.g2s();
        return '2dzoom=' + value;
    } else if (code === 5) {
        const value = dat.g2s();
        return '2dxan=' + value;
    } else if (code === 6) {
        const value = dat.g2s();
        return '2dyan=' + value;
    } else if (code === 7) {
        const value = dat.g2s();
        return '2dxof=' + value;
    } else if (code === 8) {
        const value = dat.g2s();
        return '2dyof=' + value;
    } else if (code === 9) {
        return 'code9=yes';
    } else if (code === 10) {
        const id = dat.g2();
        return 'code10=seq_' + id;
    } else if (code === 11) {
        return 'stackable=yes';
    } else if (code === 12) {
        const value = dat.g4();
        return 'cost=' + value;
    } else if (code === 16) {
        return 'members=yes';
    } else if (code === 23) {
        const id = dat.g2();
        const offset = dat.g1();
        return 'manwear=model_' + id + ',' + offset;
    } else if (code === 24) {
        const id = dat.g2();
        return 'manwear2=model_' + id;
    } else if (code === 25) {
        const id = dat.g2();
        const offset = dat.g1();
        return 'womanwear=model_' + id + ',' + offset;
    } else if (code === 26) {
        const id = dat.g2();
        return 'womanwear2=model_' + id;
    } else if (code >= 30 && code < 35) {
        const value = dat.gjstr();

        const index = code - 30;
        return 'op' + (index + 1) + '=' + value;
    } else if (code >= 35 && code < 40) {
        const value = dat.gjstr();

        const index = code - 35;
        return 'iop' + (index + 1) + '=' + value;
    } else if (code === 40) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const src = dat.g2();
            const dst = dat.g2();

            out.push('recol' + (i + 1) + 's=' + src);
            out.push('recol' + (i + 1) + 'd=' + dst);
        }

        return out;
    } else if (code === 78) {
        const id = dat.g2();
        return 'manwear3=model_' + id;
    } else if (code === 79) {
        const id = dat.g2();
        return 'womanwear3=model_' + id;
    } else if (code === 90) {
        const id = dat.g2();
        return 'manhead=model_' + id;
    } else if (code === 91) {
        const id = dat.g2();
        return 'womanhead=model_' + id;
    } else if (code === 92) {
        const id = dat.g2();
        return 'manhead2=model_' + id;
    } else if (code === 93) {
        const id = dat.g2();
        return 'womanhead2=model_' + id;
    } else if (code === 95) {
        const value = dat.g2s();
        return '2dzan=' + value;
    } else if (code === 97) {
        const id = dat.g2();
        return 'certlink=obj_' + id;
    } else if (code === 98) {
        const id = dat.g2();
        return 'certtemplate=obj_' + id;
    } else if (code >= 100 && code < 110) {
        const id = dat.g2();
        const count = dat.g2();

        const index = code - 100;
        return 'count' + (index + 1) + '=obj_' + id + ',' + count;
    } else if (code === 110) {
        const value = dat.g2();
        return '//unsupported: resizex=' + value;
    } else if (code === 111) {
        const value = dat.g2();
        return '//unsupported: resizey=' + value;
    } else if (code === 112) {
        const value = dat.g2();
        return '//unsupported: resizez=' + value;
    } else if (code === 113) {
        const value = dat.g1b();
        return '//unsupported: ambient=' + value;
    } else if (code === 114) {
        const value = dat.g1b();
        return '//unsupported: contrast=' + value;
    } else if (code === 115) {
        const value = dat.g1();
        return '//unsupported: team=' + value;
    }

    return null;
}

export function decodeSeq(dat: Packet, code: number) {
    if (code === 1) {
        const frame = [];
        const iframe = [];
        const delay = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            frame[i] = dat.g2();

            iframe[i] = dat.g2();
            if (iframe[i] === 65535) {
                iframe[i] = -1;
            }

            delay[i] = dat.g2();
        }

        const out: string[] = [];

        for (let i = 0; i < count; i++) {
            out.push('frame' + (i + 1) + '=anim_' + frame[i]);

            if (delay[i] !== 0) {
                out.push('delay' + (i + 1) + '=' + delay[i]);
            }
        }

        for (let i = 0; i < count; i++) {
            if (iframe[i] === -1) {
                continue;
            }

            out.push('iframe' + (i + 1) + '=anim_' + iframe[i]);
        }

        return out;
    } else if (code === 2) {
        const value = dat.g2();
        return 'replayoff=' + value;
    } else if (code === 3) {
        const count = dat.g1();

        const labels = [];
        for (let i = 0; i < count; i++) {
            labels[i] = dat.g1();
        }

        return 'walkmerge=' + labels.map(l => 'label_' + l).join(',');
    } else if (code === 4) {
        return 'stretches=yes';
    } else if (code === 5) {
        const value = dat.g1();
        return 'priority=' + value;
    } else if (code === 6) {
        const id = dat.g2();

        if (id === 0) {
            return 'righthand=hide';
        } else {
            return 'righthand=obj_' + (id - 512);
        }
    } else if (code === 7) {
        const id = dat.g2();

        if (id === 0) {
            return 'lefthand=hide';
        } else {
            return 'lefthand=obj_' + (id - 512);
        }
    } else if (code === 8) {
        const value = dat.g1();
        return 'replaycount=' + value;
    } else if (code === 9) {
        const value = dat.g1();
        return '//unsupported: code9=' + value;
    } else if (code === 10) {
        const value = dat.g1();
        return '//unsupported: code10=' + value;
    } else if (code === 11) {
        const value = dat.g1();
        return '//unsupported: code11=' + value;
    } else if (code === 12) {
        const value = dat.g4();
        return '//unsupported: code12=' + value;
    }

    return null;
}

export function decodeVarp(dat: Packet, code: number) {
    if (code === 5) {
        const value = dat.g2();
        return 'clientcode=' + value;
    }

    return null;
}

export function decodeSpotAnim(dat: Packet, code: number) {
    if (code === 1) {
        const id = dat.g2();
        return 'model=model_' + id;
    } else if (code === 2) {
        const id = dat.g2();
        return 'anim=seq_' + id;
    } else if (code === 3) {
        return 'hasalpha=yes';
    } else if (code === 4) {
        const size = dat.g2();
        return 'resizeh=' + size;
    } else if (code === 5) {
        const size = dat.g2();
        return 'resizev=' + size;
    } else if (code === 6) {
        const angle = dat.g2();
        return 'orientation=' + angle;
    } else if (code === 7) {
        const value = dat.g1();
        return 'ambient=' + value;
    } else if (code === 8) {
        const value = dat.g1();
        return 'contrast=' + value;
    } else if (code >= 40 && code < 50) {
        const hsl16 = dat.g2();

        const index = code - 40;
        return 'recol' + (index + 1) + 's=' + hsl16;
    } else if (code >= 50 && code < 60) {
        const hsl16 = dat.g2();

        const index = code - 50;
        return 'recol' + (index + 1) + 'd=' + hsl16;
    }

    return null;
}

enum IdkBodyPart {
    man_hair,
    man_jaw,
    man_torso,
    man_arms,
    man_hands,
    man_legs,
    man_feet,
    woman_hair,
    woman_jaw,
    woman_torso,
    woman_arms,
    woman_hands,
    woman_legs,
    woman_feet
}

export function decodeIdk(dat: Packet, code: number) {
    if (code === 1) {
        const type = dat.g1();
        return 'type=' + IdkBodyPart[type];
    } else if (code === 2) {
        const out: string[] = [];

        const count = dat.g1();
        for (let i = 0; i < count; i++) {
            const id = dat.g2();
            out.push(`model${i + 1}=model_${id}`);
        }

        return out;
    } else if (code === 3) {
        return 'disable=yes';
    } else if (code >= 40 && code < 50) {
        const hsl16 = dat.g2();

        const index = code - 40;
        return 'recol' + (index + 1) + 's=' + hsl16;
    } else if (code >= 50 && code < 60) {
        const hsl16 = dat.g2();

        const index = code - 50;
        return 'recol' + (index + 1) + 'd=' + hsl16;
    } else if (code >= 60 && code < 70) {
        const id = dat.g2();

        const index = code - 60;
        return `head${index + 1}=model_${id}`;
    }

    return null;
}

export function decodeFlo(dat: Packet, code: number) {
    if (code === 1) {
        const colour = dat.g3();
        return 'rgb=0x' + colour.toString(16).toUpperCase().padStart(6, '0');
    } else if (code === 2) {
        const texture = dat.g1();
        return 'texture=' + texture;
    } else if (code === 3) {
        return 'overlay=yes';
    } else if (code === 5) {
        return 'occlude=no';
    } else if (code === 6) {
        const name = dat.gjstr();
        return 'editname=' + name;
    } else if (code === 7) {
        const average = dat.g3();
        return '//unsupported: maprgb=0x' + average.toString(16).toUpperCase().padStart(6, '0');
    }

    return null;
}

export function decodeVarbit(dat: Packet, code: number) {
    if (code === 1) {
        const basevar = dat.g2();
        const startbit = dat.g1();
        const endbit = dat.g1();

        const out: string[] = [];
        out.push('//unsupported: basevar=varp_' + basevar);
        out.push('//unsupported: startbit=' + startbit);
        out.push('//unsupported: endbit=' + endbit);
        return out;
    }

    return null;
}

export function decodeNoOp(dat: Packet, code: number) {
    return null;
}

export function unpackWordenc(jag: Jagfile | null) {
    if (!jag) {
        return;
    }

    const badenc = jag.read('badenc.txt');
    const domainenc = jag.read('domainenc.txt');
    const fragmentsenc = jag.read('fragmentsenc.txt');
    const tldlist = jag.read('tldlist.txt');

    if (!badenc) {
        return;
    }

    if (!domainenc) {
        return;
    }

    if (!fragmentsenc) {
        return;
    }

    if (!tldlist) {
        return;
    }

    fs.mkdirSync('data/src/wordenc', { recursive: true });

    // ----

    {
        fs.writeFileSync('data/src/wordenc/badenc.txt', '');

        const total = badenc.g4();
        for (let i = 0; i < total; i++) {
            let badword = '';
            const count = badenc.g1();
            for (let j = 0; j < count; j++) {
                badword += String.fromCharCode(badenc.g1());
            }
            fs.appendFileSync('data/src/wordenc/badenc.txt', badword);

            const combinations = badenc.g1();
            for (let j = 0; j < combinations; j++) {
                const a = badenc.g1();
                const b = badenc.g1();

                fs.appendFileSync('data/src/wordenc/badenc.txt', ` ${a}:${b}`);
            }

            fs.appendFileSync('data/src/wordenc/badenc.txt', '\n');
        }
    }

    // ----

    {
        fs.writeFileSync('data/src/wordenc/domainenc.txt', '');

        const total = domainenc.g4();
        for (let i = 0; i < total; i++) {
            let domain = '';
            const count = domainenc.g1();
            for (let j = 0; j < count; j++) {
                domain += String.fromCharCode(domainenc.g1());
            }

            fs.appendFileSync('data/src/wordenc/domainenc.txt', domain + '\n');
        }
    }

    // ----

    {
        fs.writeFileSync('data/src/wordenc/fragmentsenc.txt', '');

        const total = fragmentsenc.g4();
        for (let i = 0; i < total; i++) {
            const fragment = fragmentsenc.g2();
            fs.appendFileSync('data/src/wordenc/fragmentsenc.txt', fragment + '\n');
        }
    }

    // ----

    {
        fs.writeFileSync('data/src/wordenc/tldlist.txt', '');

        const total = tldlist.g4();
        for (let i = 0; i < total; i++) {
            const type = tldlist.g1();

            let tld = '';
            const count = tldlist.g1();
            for (let j = 0; j < count; j++) {
                tld += String.fromCharCode(tldlist.g1());
            }

            fs.appendFileSync('data/src/wordenc/tldlist.txt', `${tld} ${type}\n`);
        }
    }
}
