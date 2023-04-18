import Packet from '#util/Packet.js';
import fs from 'fs';

fs.readdirSync('data/maps').filter(f => f.startsWith('l')).forEach(file => {
    decode(file);
});

function decode(map) {
    let data = Packet.fromFile(`data/maps/${map}`);
    let text = '';

    let locId = -1;
    while (true) {
        let deltaId = data.gsmart();
        if (deltaId == 0) {
            break;
        }

        locId += deltaId;

        let locData = 0;
        while (true) {
            let deltaData = data.gsmart();
            if (deltaData == 0) {
                break;
            }

            locData += deltaData - 1;

            let locX = locData >> 6 & 0x3F;
            let locZ = locData & 0x3F;
            let locPlane = locData >> 12;
            let locInfo = data.g1();
            let locType = locInfo >> 2;
            let locOrientation = locInfo & 0x3;

            text += `${locPlane} ${locX} ${locZ}: ${locId}, ${locType}, ${locOrientation}\n`;
        }
    }

    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    text = text.trimEnd().replaceAll('\r\n', '\n').split('\n').sort(collator.compare).join('\n');
    if (text.length) {
        text += '\n';
    }
    fs.writeFileSync(`data/src/maps/${map}.txt`, text);
}
