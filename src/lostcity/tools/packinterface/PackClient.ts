import Jagfile from '#jagex2/io/Jagfile.js';
import { packInterface } from './PackShared.js';

console.log('Packing interface.jag');
//console.time('interface.jag');

const jag = new Jagfile();
const data = packInterface(false);

// data.save('dump/interface/data');
jag.write('data', data);
jag.save('data/pack/client/interface');
//console.timeEnd('interface.jag');
