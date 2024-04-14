import { packServerInterface } from '#lostcity/tools/packinterface/PackServer.js';
import { packServerMap } from '#lostcity/tools/packmap/PackServer.js';
import { generateServerSymbols } from '#lostcity/tools/pack/symbols.js';
import { packConfigs } from '#lostcity/tools/packconfig/PackShared.js';

packConfigs();
packServerInterface();

packServerMap();

generateServerSymbols();
