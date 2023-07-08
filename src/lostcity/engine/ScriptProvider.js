import Packet from '#jagex2/io/Packet.js';
import Script from '#lostcity/engine/Script.js';
import World from './World.js';
import NpcType from '#lostcity/cache/NpcType.js';

// maintains a list of scripts (id <-> name)
export default class ScriptProvider {
    /**
     * Mapping of script names to its id.
     * @type {Map<string, number>}
     */
    static scriptNames = new Map()

    /**
     * Array of loaded scripts.
     * @type {[Script]}
     */
    static scripts = [];

    /**
     * Loads all scripts from `dir`.
     *
     * @param {string} dir The directory that holds the script.{dat,idx} files.
     * @returns {number} The number of scripts loaded.
     */
    static load(dir) {
        let dat = Packet.load(`${dir}/script.dat`);
        let idx = Packet.load(`${dir}/script.idx`);

        let entries = dat.g2();
        idx.pos += 2;

        ScriptProvider.scripts = new Array(entries);
        ScriptProvider.scriptNames.clear();

        let loaded = 0;
        for (let id = 0; id < entries; id++) {
            let size = idx.g2();
            if (size === 0) {
                continue;
            }

            try {
                let script = Script.decode(dat.gPacket(size));
                ScriptProvider.scripts[id] = script;
                ScriptProvider.scriptNames.set(script.name, id);
                loaded++;
            } catch (err) {
                console.error(`Failed to load script ${id}`, err);
            }
        }
        return loaded;
    }

    /**
     * Finds a script by `id`.
     * @param {number} id The script id to find.
     * @returns {Script|undefined} The script.
     */
    static get(id) {
        return this.scripts[id];
    }

    /**
     * Finds a script by `name`.
     * @param {string} name The script name to find.
     * @returns {Script|undefined} The script.
     */
    static getByName(name) {
        let id = ScriptProvider.scriptNames.get(name);
        if (id === undefined) {
            return undefined;
        }
        return ScriptProvider.scripts[id];
    }

    static findScript(trigger, subject) {
        // priority: subject -> _category -> _

        let target = null;
        let type = null;

        if (typeof subject.nid !== 'undefined') {
            target = World.getNpc(subject.nid);
            type = NpcType.get(target.type);
        }

        let script = ScriptProvider.getByName(`[${trigger},${type.config}]`);

        if (!script) {
            script = ScriptProvider.getByName(`[${trigger},_${type.category}]`);

            if (!script) {
                script = ScriptProvider.getByName(`[${trigger},_]`);
            }
        }

        return script;
    }
}

console.time('Loading script.dat');
ScriptProvider.load('data/pack/server');
console.timeEnd('Loading script.dat');
