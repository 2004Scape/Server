import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';
import { loadOrder, loadPack } from '#lostcity/util/NameMap.js';
import Jagfile from '#jagex2/io/Jagfile.js';

/* order:
  'base_label.dat',  'ob_point1.dat',
  'ob_point2.dat',   'ob_point3.dat',
  'ob_point4.dat',   'ob_point5.dat',
  'ob_head.dat',     'base_head.dat',
  'frame_head.dat',  'frame_tran1.dat',
  'frame_tran2.dat', 'ob_vertex1.dat',
  'ob_vertex2.dat',  'frame_del.dat',
  'base_type.dat',   'ob_face1.dat',
  'ob_face2.dat',    'ob_face3.dat',
  'ob_face4.dat',    'ob_face5.dat',
  'ob_axis.dat'
*/

console.log('---- models ----');

let modelOrder = loadOrder('data/pack/model.order');
let animOrder = loadOrder('data/pack/anim.order');
let baseOrder = loadOrder('data/pack/base.order');

let modelPack = loadPack('data/pack/model.pack');
let animPack = loadPack('data/pack/anim.pack');
let basePack = loadPack('data/pack/base.pack');

function listFiles(path, out = []) {
    let files = fs.readdirSync(path);

    for (let file of files) {
        if (fs.statSync(`${path}/${file}`).isDirectory()) {
            listFiles(`${path}/${file}`, out);
        } else {
            out.push(`${path}/${file}`);
        }
    }

    return out;
}

let files = listFiles('data/src/models');

// ----

let base_head = new Packet();
let base_type = new Packet();
let base_label = new Packet();

{
    base_head.p2(baseOrder.length);
    let highest = 0;
    for (let i = 0; i < baseOrder.length; i++) {
        let id = baseOrder[i];
        if (id > highest) {
            highest = id;
        }
    }
    base_head.p2(highest);

    for (let i = 0; i < baseOrder.length; i++) {
        let id = baseOrder[i];
        let name = basePack[id];

        let file = files.find(file => file.endsWith(`${name}.base`));
        if (!file) {
            console.log('missing base file', id, name);
            continue;
        }

        let data = Packet.load(file);

        data.pos = data.length - 4;
        let typeLength = data.g2();
        let labelLength = data.g2();

        base_head.p2(id);
        base_head.p1(typeLength);

        data.pos = 0;
        base_type.pdata(data.gdata(typeLength));
        base_label.pdata(data.gdata(labelLength));
    }

    // base_head.save('dump/base_head.dat');
    // base_type.save('dump/base_type.dat');
    // base_label.save('dump/base_label.dat');
}

// ----

let frame_head = new Packet();
let frame_tran1 = new Packet();
let frame_tran2 = new Packet();
let frame_del = new Packet();

{
    frame_head.p2(animOrder.length);
    let highest = 0;
    for (let i = 0; i < animOrder.length; i++) {
        let id = animOrder[i];
        if (id > highest) {
            highest = id;
        }
    }
    frame_head.p2(highest);

    for (let i = 0; i < animOrder.length; i++) {
        let id = animOrder[i];
        let name = animPack[id];

        let file = files.find(file => file.endsWith(`${name}.frame`));
        if (!file) {
            console.log('missing frame file', id, name);
            continue;
        }

        let data = Packet.load(file);

        data.pos = data.length - 8;
        let headLength = data.g2();
        let tran1Length = data.g2();
        let tran2Length = data.g2();
        let delLength = data.g2();

        data.pos = 0;
        frame_head.pdata(data.gdata(headLength));
        frame_tran1.pdata(data.gdata(tran1Length));
        frame_tran2.pdata(data.gdata(tran2Length));
        frame_del.pdata(data.gdata(delLength));
    }

    // frame_head.save('dump/frame_head.dat');
    // frame_tran1.save('dump/frame_tran1.dat');
    // frame_tran2.save('dump/frame_tran2.dat');
    // frame_del.save('dump/frame_del.dat');
}

// ----

let ob_head = new Packet();
let ob_face1 = new Packet();
let ob_face2 = new Packet();
let ob_face3 = new Packet();
let ob_face4 = new Packet();
let ob_face5 = new Packet();
let ob_point1 = new Packet();
let ob_point2 = new Packet();
let ob_point3 = new Packet();
let ob_point4 = new Packet();
let ob_point5 = new Packet();
let ob_vertex1 = new Packet();
let ob_vertex2 = new Packet();
let ob_axis = new Packet();

{
    ob_head.p2(modelOrder.length);

    for (let i = 0; i < modelOrder.length; i++) {
        let id = modelOrder[i];
        let name = modelPack[id];

        let file = files.find(file => file.endsWith(`${name}.ob2`));
        if (!file) {
            console.log('missing ob2 file', id, name);
            continue;
        }

        let data = Packet.load(file);

        data.pos = data.length - 18;
        let vertexCount = data.g2();
        let faceCount = data.g2();
        let texturedFaceCount = data.g1();

        let hasInfo = data.g1();
        let hasPriorities = data.g1();
        let hasAlpha = data.g1();
        let hasFaceLabels = data.g1();
        let hasVertexLabels = data.g1();

        let vertexXLength = data.g2();
        let vertexYLength = data.g2();
        let vertexZLength = data.g2();
        let faceVertexLength = data.g2();

        ob_head.p2(id);
        ob_head.p2(vertexCount);
        ob_head.p2(faceCount);
        ob_head.p1(texturedFaceCount);
        ob_head.p1(hasInfo);
        ob_head.p1(hasPriorities);
        ob_head.p1(hasAlpha);
        ob_head.p1(hasFaceLabels);
        ob_head.p1(hasVertexLabels);

        data.pos = 0;
        ob_point1.pdata(data.gdata(vertexCount));
        ob_vertex2.pdata(data.gdata(faceCount));

        if (hasPriorities == 255) {
            ob_face3.pdata(data.gdata(faceCount));
        }

        if (hasFaceLabels == 1) {
            ob_face5.pdata(data.gdata(faceCount));
        }

        if (hasInfo == 1) {
            ob_face2.pdata(data.gdata(faceCount));
        }

        if (hasVertexLabels == 1) {
            ob_point5.pdata(data.gdata(vertexCount));
        }

        if (hasAlpha == 1) {
            ob_face4.pdata(data.gdata(faceCount));
        }

        ob_vertex1.pdata(data.gdata(faceVertexLength));
        ob_face1.pdata(data.gdata(faceCount * 2));
        ob_axis.pdata(data.gdata(texturedFaceCount * 6));
        ob_point2.pdata(data.gdata(vertexXLength));
        ob_point3.pdata(data.gdata(vertexYLength));
        ob_point4.pdata(data.gdata(vertexZLength));
    }

    // ob_head.save('dump/ob_head.dat');
    // ob_face1.save('dump/ob_face1.dat');
    // ob_face2.save('dump/ob_face2.dat');
    // ob_face3.save('dump/ob_face3.dat');
    // ob_face4.save('dump/ob_face4.dat');
    // ob_face5.save('dump/ob_face5.dat');
    // ob_point1.save('dump/ob_point1.dat');
    // ob_point2.save('dump/ob_point2.dat');
    // ob_point3.save('dump/ob_point3.dat');
    // ob_point4.save('dump/ob_point4.dat');
    // ob_point5.save('dump/ob_point5.dat');
    // ob_vertex1.save('dump/ob_vertex1.dat');
    // ob_vertex2.save('dump/ob_vertex2.dat');
    // ob_axis.save('dump/ob_axis.dat');
}

// ----

let jag = new Jagfile();

jag.write('base_label.dat', base_label);
jag.write('ob_point1.dat', ob_point1);
jag.write('ob_point2.dat', ob_point2);
jag.write('ob_point3.dat', ob_point3);
jag.write('ob_point4.dat', ob_point4);
jag.write('ob_point5.dat', ob_point5);
jag.write('ob_head.dat', ob_head);
jag.write('base_head.dat', base_head);
jag.write('frame_head.dat', frame_head);
jag.write('frame_tran1.dat', frame_tran1);
jag.write('frame_tran2.dat', frame_tran2);
jag.write('ob_vertex1.dat', ob_vertex1);
jag.write('ob_vertex2.dat', ob_vertex2);
jag.write('frame_del.dat', frame_del);
jag.write('base_type.dat', base_type);
jag.write('ob_face1.dat', ob_face1);
jag.write('ob_face2.dat', ob_face2);
jag.write('ob_face3.dat', ob_face3);
jag.write('ob_face4.dat', ob_face4);
jag.write('ob_face5.dat', ob_face5);
jag.write('ob_axis.dat', ob_axis);

jag.save('data/pack/client/models');
