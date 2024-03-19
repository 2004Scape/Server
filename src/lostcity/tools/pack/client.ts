import { packClientConfig } from '#lostcity/tools/packconfig/PackClient.js';
import { packClientInterface } from '#lostcity/tools/packinterface/PackClient.js';
import { packClientMap } from '#lostcity/tools/packmap/PackClient.js';
import { packClientModel } from '#lostcity/tools/client/models/pack.js';
import { packClientMusic } from '#lostcity/tools/client/music/pack.js';
import { packClientSound } from '#lostcity/tools/client/sounds/pack.js';
import { packClientWordenc } from '#lostcity/tools/client/wordenc/pack.js';
import { packClientTitle } from '#lostcity/tools/client/title/pack.js';
import { packClientTexture } from '#lostcity/tools/client/textures/pack.js';
import { packClientMedia } from '#lostcity/tools/client/media/pack.js';

await packClientTitle();
packClientConfig();
packClientInterface();
await packClientMedia();
packClientModel();
await packClientTexture();
packClientWordenc();
packClientSound();

packClientMap();
packClientMusic();
