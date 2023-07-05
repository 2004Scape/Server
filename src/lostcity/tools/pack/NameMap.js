import fs from 'fs';

export function loadOrder(path) {
    if (!fs.existsSync(path)) {
        return [];
    }

    return fs.readFileSync(path, 'ascii').replace(/\r/g, '').split('\n').filter(x => x).map(x => parseInt(x));
}

export function loadPack(path) {
    if (!fs.existsSync(path)) {
        return [];
    }

    return fs.readFileSync(path, 'ascii').replace(/\r/g, '').split('\n').filter(x => x).reduce((acc, x) => {
        let [id, name] = x.split('=');
        acc[id] = name;
        return acc;
    }, []);
}

export function loadDir(path, extension, callback) {
    let files = fs.readdirSync(path);

    for (let file of files) {
        if (fs.statSync(`${path}/${file}`).isDirectory()) {
            loadDir(`${path}/${file}`, extension, callback);
        } else if (file.endsWith(extension)) {
            callback(fs.readFileSync(`${path}/${file}`, 'ascii').replace(/\r/g, '').split('\n').filter(x => x), file);
        }
    }
}
