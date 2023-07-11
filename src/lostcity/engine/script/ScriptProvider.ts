import Packet from '#jagex2/io/Packet.js';
import Script from '#lostcity/engine/script/Script.js';
import World from "#lostcity/engine/World.js";
import NpcType from '#lostcity/cache/NpcType.js';
import CategoryType from '#lostcity/cache/CategoryType.js';

// maintains a list of scripts (id <-> name)
export default class ScriptProvider {
    /**
     * The expected version of the script compiler that the runtime should be loading scripts from.
     */
    private static readonly COMPILER_VERSION = 1;

    /**
     * Mapping of script names to its id.
     */
    static scriptNames = new Map<string, number>()

    /**
     * Array of loaded scripts.
     */
    static scripts: Script[] = [];

    /**
     * Loads all scripts from `dir`.
     *
     * @param dir The directory that holds the script.{dat,idx} files.
     * @returns The number of scripts loaded.
     */
    static load(dir: string): number {
        let dat = Packet.load(`${dir}/script.dat`);
        let idx = Packet.load(`${dir}/script.idx`);

        let entries = dat.g2();
        idx.pos += 2;

        let version = dat.g4();
        if (version !== ScriptProvider.COMPILER_VERSION) {
            throw new Error(`Compiler version mismatch. Got ${version} but expected ${(ScriptProvider.COMPILER_VERSION)}. Check the #dev-resources channel in Discord for the latest version.`);
        }

        ScriptProvider.scripts = [];
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
     * @param id The script id to find.
     * @returns The script.
     */
    static get(id: number): Script | undefined {
        return this.scripts[id];
    }

    /**
     * Finds a script by `name`.
     * @param name The script name to find.
     * @returns The script.
     */
    static getByName(name: string): Script | undefined {
        let id = ScriptProvider.scriptNames.get(name);
        if (id === undefined) {
            return undefined;
        }
        return ScriptProvider.scripts[id];
    }

    static findScript(trigger: string, subject: any) {
        // priority: subject -> _category -> _

        let target = null;
        let type: any = {};

        if (typeof subject.nid !== 'undefined') {
            target = World.getNpc(subject.nid);
            type = NpcType.get(target!.type); // TODO (jkm) consider whether we want to use ! here
        }

        let script = ScriptProvider.getByName(`[${trigger},${type.configName}]`);

        let category = type.category !== -1 ? CategoryType.get(type.category) : null;
        if (!script && category) {
            script = ScriptProvider.getByName(`[${trigger},_${category}]`);
        }

        if (!script) {
            script = ScriptProvider.getByName(`[${trigger},_]`);
        }

        return script;
    }
}
