import fs from 'fs';

export function readTextNormalize(path: string) {
    if (!fs.existsSync(path)) {
        return null;
    }

    return fs.readFileSync(path, 'utf8').replace(/\r/g, '');
}

// -----

// simple! just reads the file as-is
export function loadFile(path: string) {
    return readTextNormalize(path)!.split('\n').filter(x => x.length);
}

// fully-featured! strips out comments
export function loadFileFull(path: string) {
    const text = readTextNormalize(path)!.split('\n');
    const lines = [];

    let multiCommentStart = 0;
    let multiLineComments = 0;
    for (let i = 0; i < text.length; i++) {
        let line = text[i].trim();
        if (multiLineComments > 0) {
            let commentStart = line.indexOf('/*');
            while (commentStart !== -1) {
                line = line.substring(commentStart + 2).trimStart();
                multiLineComments++;
                commentStart = line.indexOf('/*');
            }

            let commentEnd = line.indexOf('*/');
            while (commentEnd !== -1 && multiLineComments > 0) {
                line = line.substring(commentEnd + 2).trimStart();
                multiLineComments--;
                commentEnd = line.indexOf('*/');
            }

            if (multiLineComments > 0) {
                continue;
            }
        }

        if (line.length === 0) {
            continue;
        }

        // if a line contains a single-line comment, strip it out
        const comment = line.indexOf('//');
        if (comment !== -1) {
            line = line.substring(0, comment).trimEnd();
            if (line.length === 0) {
                continue;
            }
        }

        // if a line contains a multi-line comment, strip it out
        const commentStart = line.indexOf('/*');
        const commentEnd = line.indexOf('*/');
        if (commentStart !== -1) {
            if (commentEnd !== -1) {
                // comment ends on this line!
                line = line.substring(0, commentStart) + line.substring(commentEnd + 2);
            } else {
                // comment continues to another line
                line = line.substring(0, commentStart);
                multiLineComments++;

                if (multiCommentStart === 0) {
                    multiCommentStart = i + 1;
                }
            }

            if (line.length === 0) {
                continue;
            }
        }

        lines.push(line);
    }

    if (multiLineComments > 0) {
        throw new Error(`${path} has an unclosed multi-line comment! Line: ${multiCommentStart}`);
    }

    return lines;
}

// ----

// Generate a list of files inside a directory
export function listFiles(dir: string, out: string[] = []): string[] {
    if (!fs.existsSync(dir)) {
        return out;
    }

    const files = fs.readdirSync(dir);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!fs.existsSync(`${dir}/${file}`)) {
            continue;
        }

        const isDir = fs.statSync(`${dir}/${file}`).isDirectory();
        if (isDir) {
            listFiles(`${dir}/${file}`, out);
        } else {
            out.push(`${dir}/${file}`);
        }
    }

    return out;
}

// Read all files inside a directory
export function loadDir(dir: string, callback: Function) {
    const files = listFiles(dir);

    for (let i = 0; i < files.length; i++) {
        callback(loadFile(files[i]), files[i]);
    }
}

// Read all files inside a directory with extra features
export function loadDirFull(dir: string, callback: Function) {
    const files = listFiles(dir);

    for (let i = 0; i < files.length; i++) {
        callback(loadFileFull(files[i]), files[i]);
    }
}

// ----

// Generate a list of files inside a directory with a specific extension
export function listFilesExt(dir: string, ext: string, out: string[] = []): string[] {
    if (!fs.existsSync(dir)) {
        return out;
    }

    const files = fs.readdirSync(dir);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!fs.existsSync(`${dir}/${file}`)) {
            continue;
        }

        const isDir = fs.statSync(`${dir}/${file}`).isDirectory();
        if (isDir) {
            listFilesExt(`${dir}/${file}`, ext, out);
        } else {
            if (file.endsWith(ext)) {
                out.push(`${dir}/${file}`);
            }
        }
    }

    return out;
}

// Read all files inside a directory with a specific extension
export function loadDirExt(dir: string, ext: string, callback: Function) {
    const files = listFilesExt(dir, ext);

    for (let i = 0; i < files.length; i++) {
        callback(loadFile(files[i]), files[i]);
    }
}

// Read all files inside a directory with a specific extension with extra features
export function loadDirExtFull(dir: string, ext: string, callback: Function) {
    const files = listFilesExt(dir, ext);

    for (let i = 0; i < files.length; i++) {
        callback(loadFileFull(files[i]), files[i]);
    }
}
