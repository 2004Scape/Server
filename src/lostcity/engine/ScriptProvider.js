import fs from 'fs';
import path from 'path';

import Packet from '#jagex2/io/Packet.js';
import Script from '#lostcity/engine/Script.js';

// maintains a list of scripts (id <-> name)
export default class ScriptProvider {
    static scripts = [];

    static loadDirectory(dir) {
        let dirListing = fs.readdirSync(dir);

        for (let file of dirListing) {
            let full = path.join(dir, file);

            // recursively load subdirectories
            let stat = fs.statSync(full);
            if (stat.isDirectory()) {
                ScriptProvider.loadDirectory(full);
                continue;
            }

            let id = parseInt(file); // (filename is the script id)
            if (isNaN(id)) {
                continue;
            }

            try {
                let script = Script.decode(Packet.load(full));
                ScriptProvider.scripts[id] = script; // we can hotload scripts by replacing the script at the id
            } catch (err) {
                console.error(`Failed to load script ${id}: ${err.message}`);
            }
        }
    }

    static get(id) {
        return this.scripts[id];
    }

    static getByName(name) {
        for (let script of this.scripts) {
            if (script && script.name === name) {
                return script;
            }
        }

        return null;
    }
}

ScriptProvider.loadDirectory('data/pack/server/scripts/');
