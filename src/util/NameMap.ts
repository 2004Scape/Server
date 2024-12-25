import fs from 'fs';

// cached directory listings
export const dirCache: Map<string, string[]> = new Map();

export function listDir(path: string): string[] {
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }

    let files: string[] | undefined = undefined;

    if (dirCache.has(path)) {
        files = dirCache.get(path);
    }

    if (!files) {
        if (!fs.existsSync(path)) {
            return [];
        }

        files = fs.readdirSync(path);

        for (let i = 0; i < files.length; i++) {
            const stat = fs.statSync(`${path}/${files[i]}`);

            if (stat.isDirectory()) {
                files[i] = files[i] + '/';
            }
        }

        dirCache.set(path, files);
    }

    const all: string[] = [];
    for (let i = 0; i < files.length; i++) {
        all.push(`${path}/${files[i]}`);

        if (files[i].endsWith('/')) {
            all.push(...listDir(`${path}/${files[i]}`));
        }
    }

    return all;
}

export function loadOrder(path: string) {
    if (!fs.existsSync(path)) {
        return [];
    }

    return fs
        .readFileSync(path, 'ascii')
        .replace(/\r/g, '')
        .split('\n')
        .filter(x => x)
        .map(x => parseInt(x));
}

// TODO (jkm) use Record<..> here rather than string-typed arrays

export function loadPack(path: string) {
    if (!fs.existsSync(path)) {
        return [] as string[];
    }

    return fs
        .readFileSync(path, 'ascii')
        .replace(/\r/g, '')
        .split('\n')
        .filter(x => x)
        .reduce((acc, x) => {
            const [id, name] = x.split('=');
            acc[id as unknown as number] = name;
            return acc;
        }, [] as string[]);
}

export function loadDir(path: string, extension: string, callback: (src: string[], file: string, path: string) => void) {
    const files = listDir(path);

    for (const file of files) {
        if (file.endsWith(extension)) {
            callback(
                fs.readFileSync(file, 'ascii')
                    .replace(/\r/g, '')
                    .split('\n')
                    .filter(x => x),
                file.substring(file.lastIndexOf('/') + 1),
                file.substring(0, file.lastIndexOf('/'))
            );
        }
    }
}

export function loadDirExact(path: string, extension: string, callback: (src: string[], file: string, path: string) => void) {
    const files = listDir(path);

    for (const file of files) {
        if (file.endsWith(extension)) {
            callback(
                fs.readFileSync(file, 'ascii')
                    .replace(/\r/g, '')
                    .split('\n'),
                file.substring(file.lastIndexOf('/') + 1),
                file.substring(0, file.lastIndexOf('/'))
            );
        }
    }
}

export function listFiles(path: string, out: string[] = []) {
    const files = listDir(path);

    for (const file of files) {
        out.push(file);
    }

    return out;
}
