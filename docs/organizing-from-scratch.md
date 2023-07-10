This page describes the process I took when starting the project.

Be sure to place the original client cache in `dump/client`.

1. Execute `src/lostcity/tools/client/unpack/all.js` to turn the packed cache into workable files.
2. Execute `src/lostcity/tools/client/models/reorg.js` to organize models based on the types that link them. 
3. Open `dump/src/scripts/all.obj` and regex-replace `\n.*\ncertlink=.*\ncerttemplate=.*\n` with `tradeable=yes\n` in VS code. I didn't write a script for this. There might be things to manually fix as a cert is not always immediately following the linked object.
4. Execute `src/lostcity/tools/client/config/obj-remove-cert.js` to prepend cert_ to all noted item names in the .pack file.
5. Execute `src/lostcity/tools/client/config/obj-reorg.js` to reorganize the order of some properties in obj configs.
6. Execute `src/lostcity/tools/client/sounds/reorg.js` to rename sounds based on known OSRS matches (specific to rev <= 225).
7. post-step: Manually add in missing properties from OSRS/wiki. Obj needs wearpos/2/3, weight, (optional) category, (optional) params.
8. post-step: Manually extract configs into grouped files e.g. from all.obj into .obj files.
9. post-step: Manually give everything a name inside the config and .pack file.

To check the files into source control, move everything from `dump/` into `data/`, minus the original cache.
