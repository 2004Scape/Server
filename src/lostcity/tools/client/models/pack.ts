import Packet from '#jagex2/io/Packet.js';
import { loadOrder, loadPack, listFiles } from '#lostcity/util/NameMap.js';
import Jagfile from '#jagex2/io/Jagfile.js';
import { shouldBuildFileAny } from '#lostcity/util/PackFile.js';

export function packClientModel() {
    if (!shouldBuildFileAny('data/src/models', 'data/pack/client/models')) {
        return;
    }

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

    console.log('Packing models.jag');
    //console.time('models.jag');

    const modelOrder = loadOrder('data/pack/model.order');
    const animOrder = loadOrder('data/pack/anim.order');
    const baseOrder = loadOrder('data/pack/base.order');

    const modelPack = loadPack('data/pack/model.pack');
    const animPack = loadPack('data/pack/anim.pack');
    const basePack = loadPack('data/pack/base.pack');

    const files = listFiles('data/src/models');

    // ----

    const base_head = new Packet();
    const base_type = new Packet();
    const base_label = new Packet();

    {
        base_head.p2(baseOrder.length);
        let highest = 0;
        for (let i = 0; i < baseOrder.length; i++) {
            const id = baseOrder[i];
            if (id > highest) {
                highest = id;
            }
        }
        base_head.p2(highest);

        for (let i = 0; i < baseOrder.length; i++) {
            const id = baseOrder[i];
            const name = basePack[id];

            const file = files.find(file => file.endsWith(`${name}.base`));
            if (!file) {
                console.log('missing base file', id, name);
                continue;
            }

            const data = Packet.load(file);

            data.pos = data.length - 4;
            const typeLength = data.g2();
            const labelLength = data.g2();

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

    const frame_head = new Packet();
    const frame_tran1 = new Packet();
    const frame_tran2 = new Packet();
    const frame_del = new Packet();

    {
        frame_head.p2(animOrder.length);
        let highest = 0;
        for (let i = 0; i < animOrder.length; i++) {
            const id = animOrder[i];
            if (id > highest) {
                highest = id;
            }
        }
        frame_head.p2(highest);

        for (let i = 0; i < animOrder.length; i++) {
            const id = animOrder[i];
            const name = animPack[id];

            const file = files.find(file => file.endsWith(`${name}.frame`));
            if (!file) {
                console.log('missing frame file', id, name);
                continue;
            }

            const data = Packet.load(file);

            data.pos = data.length - 8;
            const headLength = data.g2();
            const tran1Length = data.g2();
            const tran2Length = data.g2();
            const delLength = data.g2();

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

    const ob_head = new Packet();
    const ob_face1 = new Packet();
    const ob_face2 = new Packet();
    const ob_face3 = new Packet();
    const ob_face4 = new Packet();
    const ob_face5 = new Packet();
    const ob_point1 = new Packet();
    const ob_point2 = new Packet();
    const ob_point3 = new Packet();
    const ob_point4 = new Packet();
    const ob_point5 = new Packet();
    const ob_vertex1 = new Packet();
    const ob_vertex2 = new Packet();
    const ob_axis = new Packet();

    {
        ob_head.p2(modelOrder.length);

        for (let i = 0; i < modelOrder.length; i++) {
            const id = modelOrder[i];
            const name = modelPack[id];

            const file = files.find(file => file.endsWith(`${name}.ob2`));
            if (!file) {
                console.log('missing ob2 file', id, name);
                continue;
            }

            const data = Packet.load(file);

            data.pos = data.length - 18;
            const vertexCount = data.g2();
            const faceCount = data.g2();
            const texturedFaceCount = data.g1();

            const hasInfo = data.g1();
            const hasPriorities = data.g1();
            const hasAlpha = data.g1();
            const hasFaceLabels = data.g1();
            const hasVertexLabels = data.g1();

            const vertexXLength = data.g2();
            const vertexYLength = data.g2();
            const vertexZLength = data.g2();
            const faceVertexLength = data.g2();

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

    const jag = new Jagfile();

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
    //console.timeEnd('models.jag');
}
