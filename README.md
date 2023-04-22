# 2004scape

This is an open-source emulation project targeting May 2004.

[Website](https://2004scape.org), [Discord](https://discord.gg/hN3tHUmZEN), [Rune-Server](https://www.rune-server.ee/runescape-development/rs2-server/projects/701698-lost-city-225-emulation.html)

## Dependencies

- [NodeJS 16+](https://nodejs.org/en), so the server can run. I use Node 19 currently.
- [Java](https://adoptium.net/), an unfortunate requirement so JagCompress.jar can generate 1:1 copies of files from source. Very important for CRC matching.

Java must be on your path. Maybe compressing will be improved in the future.

## How can I help?

We could always use help with data entry, content scripts, the core, and testing.  
It's also important to find old sources from 2004 to help with the accuracy. Any help is appreciated.

Not necessary but nice to have: More information on the original config formats. It would be good to know how their unpacked data is structured.

## Running the server for the first time

This may take a few minutes to parse all the text files and turn them into their encoded versions. This only needs to be ran once. 

```sh
cp .env.example .env

# install dependencies
npm i

# generates client cache under data/cache/
node tools/pack/ConfigFromDef.js

# generates client maps (tile map) under data/maps/
node tools/pack/MapLandFromText.js

# generates client maps (object map) under data/maps/
node tools/pack/MapLocFromText.js

# generates cache -> server ID mappings
node tools/cache/InitJsMapping.js

npm start
```

ConfigFromDef should be ran whenever a def file is updated.  
InitJsMapping.js should be ran whenever loc.def, npc.def, or obj.def has a name added or updated.  
MapLandFromText.js should be ran whenever a "mX_Z" file is updated.  
MapLocFromText.js should be ran whenever a "lX_Z" file is updated.  

If you get locked out of the account server (or stuck logged in), you can use local player saves by editing .env and commenting out MASTER_ADDRESS with a #. There's also an API to force logging out, but it's not documented yet.

## Scripting

The "yield" keyword is very important. It allows NodeJS to stop executing the script immediately and check the conditions before running again. Generator functions are used to manage/restore the control flow.  

As much as possible is inherited from the leaks on the original system designs.

## pm2 (optional)

pm2 is a node process manager that I use to autostart/restart the dedicated servers.

`pm2 start src/app.js --kill-timeout 10000`

The timeout is necessary so the system reboot timer can run and flush player data before quitting.

## obj.def

### weight

weight accepts g, kg, oz, and lb.

Usage: `weight=6lb` (2.721 kg)

### wearpos

wearpos accepts the following:
```
hat - helmet
back - cape
front - amulet
righthand - weapon
body - torso
lefthand - shield
arms - hides arms
legs - hides legs
head - hides head
hands - gloves
feet - boots
jaw - hides beard
ring
quiver - ammo
```

To use multiple wearpos values (to hide body parts), put them on newlines:
```
wearpos=hat
wearpos2=head

wearpos=hat
wearpos2=head
wearpos3=jaw

wearpos=torso
wearpos2=arms
wearpos3=hands
```

The first value should be the worn slot it goes into.

### param

param=key,value

Useful for adding custom properties to items for scripts to read from.

Usage: `param=stabattack,1`

Some implemented keys:
```
stabattack
slashattack
crushattack
magicattack
rangeattack
stabdefence
slashdefence
crushdefence
magicdefence
rangedefence
strengthbonus
rangedbonus
magicbonus
prayerbonus
```
