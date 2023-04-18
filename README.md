## Pre-requisites

- NodeJS 16+, so the server can run. I use Node 19.
- Java, so JagCompress.jar can generate 1:1 copies of files from source.

## Running the server for the first time

This may take a few minutes, BZip2 is slow to compress. This only needs to be ran once. 

```sh
cp .env.example .env

# install dependencies
npm i

# generates client cache under data/cache/
node tools/cache/ConfigFromDef.js

# generates client maps (tile map) under data/maps/
node tools/cache/MapLandFromText.js

# generates client maps (object map) under data/maps/
node tools/cache/MapLocFromText.js

# generates cache -> server ID mappings
node tools/cache/InitJsMapping.js

npm start
```

ConfigFromDef should be ran whenever a def file is updated.  
InitJsMapping.js should be ran whenever loc.def, npc.def, or obj.def has a name added or updated.  
MapLandFromText.js should be ran whenever a "mX_Z" file is updated.  
MapLocFromText.js should be ran whenever a "lX_Z" file is updated.
