import { packServerConfig } from '#lostcity/tools/packconfig/PackServer.js';
import { packServerInterface } from '#lostcity/tools/packinterface/PackServer.js';
import { packServerMap } from '#lostcity/tools/packmap/PackServer.js';
import { generateServerSymbols } from '#lostcity/tools/pack/symbols.js';

packServerConfig();
packServerInterface();

packServerMap();

generateServerSymbols();
