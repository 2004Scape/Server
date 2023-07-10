import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';
import Model from '#lostcity/tools/client/models/Model.js';

let models = Jagfile.load('dump/client/models');

// ----

{
    Model.unpack(models);

    let pack = '';
    for (let i = 0; i < Model.metadata.length; i++) {
        if (!Model.metadata[i]) {
            continue;
        }

        pack += `${i}=model_${i}\n`;

        let model = Model.get(i);
        let raw = model.convert();
        raw.save(`dump/src/models/model_${i}.ob2`);
    }

    let order = '';
    for (let i = 0; i < Model.order.length; i++) {
        order += `${Model.order[i]}\n`;
    }

    fs.writeFileSync('dump/pack/model.pack', pack);
    fs.writeFileSync('dump/pack/model.order', order);
}

// ----

{
    if (!fs.existsSync('dump/src/models/base')) {
        fs.mkdirSync('dump/src/models/base', { recursive: true });
    }

    let pack = '';
    let order = '';

    let head = models.read('base_head.dat');
    let type = models.read('base_type.dat');
    let label = models.read('base_label.dat');

    let total = head.g2(); // # to read
    let instances = head.g2(); // highest ID

    for (let i = 0; i < total; i++) {
        // let hstart = head.pos;
        let tstart = type.pos;
        let labelstart = label.pos;

        let id = head.g2();
        order += `${id}\n`;
        pack += `${id}=base_${id}\n`;

        let length = head.g1();
        for (let j = 0; j < length; j++) {
            type.g1();

            let labelCount = label.g1();
            for (let k = 0; k < labelCount; k++) {
                label.g1();
            }
        }

        // let hend = head.pos;
        let tend = type.pos;
        let labelend = label.pos;

        let base = new Packet();
        // base.pdata(head.gdata(hend - hstart, hstart, false));
        base.pdata(type.gdata(tend - tstart, tstart, false));
        base.pdata(label.gdata(labelend - labelstart, labelstart, false));
        // base.p2(hend - hstart);
        base.p2(tend - tstart);
        base.p2(labelend - labelstart);
        base.save(`dump/src/models/base/base_${id}.base`);
    }

    fs.writeFileSync('dump/pack/base.pack', pack);
    fs.writeFileSync('dump/pack/base.order', order);
}

// ----

{
    if (!fs.existsSync('dump/src/models/frame')) {
        fs.mkdirSync('dump/src/models/frame', { recursive: true });
    }

    let pack = '';
    let order = '';

    let head = models.read('frame_head.dat');
    let tran1 = models.read('frame_tran1.dat');
    let tran2 = models.read('frame_tran2.dat');
    let del = models.read('frame_del.dat');

    let total = head.g2();
    let instances = head.g2();

    for (let i = 0; i < total; i++) {
        let hstart = head.pos;
        let t1start = tran1.pos;
        let t2start = tran2.pos;
        let dstart = del.pos;

        let id = head.g2();
        del.g1();
        head.g2();

        order += `${id}\n`;
        pack += `${id}=anim_${id}\n`;

        let labelCount = head.g1();
        for (let j = 0; j < labelCount; j++) {
            let flags = tran1.g1();
            if (flags === 0) {
                continue;
            }

            if ((flags & 0x1) != 0) {
                tran2.gsmarts();
            }

            if ((flags & 0x2) != 0) {
                tran2.gsmarts();
            }

            if ((flags & 0x4) != 0) {
                tran2.gsmarts();
            }
        }

        let hend = head.pos;
        let t1end = tran1.pos;
        let t2end = tran2.pos;
        let dend = del.pos;

        let frame = new Packet();
        frame.pdata(head.gdata(hend - hstart, hstart, false));
        frame.pdata(tran1.gdata(t1end - t1start, t1start, false));
        frame.pdata(tran2.gdata(t2end - t2start, t2start, false));
        frame.pdata(del.gdata(dend - dstart, dstart, false));
        frame.p2(hend - hstart);
        frame.p2(t1end - t1start);
        frame.p2(t2end - t2start);
        frame.p2(dend - dstart);
        frame.save(`dump/src/models/frame/anim_${id}.frame`);
    }

    fs.writeFileSync('dump/pack/anim.pack', pack);
    fs.writeFileSync('dump/pack/anim.order', order);
}
