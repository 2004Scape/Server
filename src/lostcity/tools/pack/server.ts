import { packServerInterface } from '#lostcity/tools/packinterface/PackServer.js';
import { packServerMap } from '#lostcity/tools/packmap/PackServer.js';
import { generateServerSymbols } from '#lostcity/tools/pack/symbols.js';
import { packConfigs } from '#lostcity/tools/packconfig/PackShared.js';

console.time('packing server...');
packConfigs();
packServerInterface();

packServerMap();

generateServerSymbols();
console.timeEnd('packing server...');
