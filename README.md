## Pre-requisites

- NodeJS 16+, so the server can run.
- Java, so JagCompress.jar can generate 1:1 copies of files from source.

## Running the server for the first time

```sh
cp .env.example .env
npm i
node tools/cache/ConfigFromDef.js # generates client cache under data/cache/
node tools/cache/MapLandFromText.js # generates client maps (tile map) under data/maps/
node tools/cache/MapLocFromText.js # generates client maps (object map) under data/maps/
node tools/cache/InitJsMapping.js # generates cache -> server ID mappings
npm start
```
