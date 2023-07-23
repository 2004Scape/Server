import fs from 'fs';
import { listFilesExt, loadDirExtFull } from '#lostcity/util/Parse.js';

export function getLatestModified(path: string, ext: string) {
    const files = listFilesExt(path, ext);

    let latest = 0;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const stats = fs.statSync(file);

        if (stats.mtimeMs > latest) {
            latest = stats.mtimeMs;
        }
    }

    return latest;
}

export function shouldBuild(path: string, ext: string, out: string) {
    if (!fs.existsSync(out)) {
        return true;
    }

    const stats = fs.statSync(out);
    const latest = getLatestModified(path, ext);

    return stats.mtimeMs < latest;
}

export function shouldBuildFile(src: string, dest: string) {
    if (!fs.existsSync(dest)) {
        return true;
    }

    const stats = fs.statSync(dest);
    const srcStats = fs.statSync(src);

    return stats.mtimeMs < srcStats.mtimeMs;
}

export function crawlConfigNames(ext: string, includeBrackets = false) {
    const names: string[] = [];

    loadDirExtFull('data/src/scripts', ext, (lines: string, file: string) => {
        if (file === 'engine.rs2') {
            // these command signatures are specifically for the compiler to have type information
            return;
        }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('[')) {
                let name = line.substring(0, line.indexOf(']') + 1);
                if (!includeBrackets) {
                    name = name.substring(1, name.length - 1);
                }

                if (names.indexOf(name) === -1) {
                    names.push(name);
                }
            }
        }
    });

    return names;
}

export function crawlConfigCategories() {
    const names: string[] = [];

    loadDirExtFull('data/src/scripts', '.loc', (lines: string) => {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('category=')) {
                let name = line.substring('category='.length);

                if (names.indexOf(name) === -1) {
                    names.push(name);
                }
            }
        }
    });

    loadDirExtFull('data/src/scripts', '.npc', (lines: string) => {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('category=')) {
                let name = line.substring('category='.length);

                if (names.indexOf(name) === -1) {
                    names.push(name);
                }
            }
        }
    });

    loadDirExtFull('data/src/scripts', '.obj', (lines: string) => {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('category=')) {
                let name = line.substring('category='.length);

                if (names.indexOf(name) === -1) {
                    names.push(name);
                }
            }
        }
    });

    return names;
}
