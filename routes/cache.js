import fs from 'fs';
import { crcTable } from '#util/GlobalCache.js';

export default function (f, opts, next) {
    f.get('/crc:rand', async (req, res) => {
        res.header('Content-Type', 'application/octet-stream');
        return Buffer.from(crcTable.data);
    });

    f.get('/title:crc', async (req, res) => {
        return res.sendFile('data/cache/title', process.cwd());
    });

    f.get('/config:crc', async (req, res) => {
        return res.sendFile('data/cache/config', process.cwd());
    });

    f.get('/interface:crc', async (req, res) => {
        return res.sendFile('data/cache/interface', process.cwd());
    });

    f.get('/media:crc', async (req, res) => {
        return res.sendFile('data/cache/media', process.cwd());
    });

    f.get('/models:crc', async (req, res) => {
        return res.sendFile('data/cache/models', process.cwd());
    });

    f.get('/sounds:crc', async (req, res) => {
        return res.sendFile('data/cache/sounds', process.cwd());
    });

    f.get('/textures:crc', async (req, res) => {
        return res.sendFile('data/cache/textures', process.cwd());
    });

    f.get('/wordenc:crc', async (req, res) => {
        return res.sendFile('data/cache/wordenc', process.cwd());
    });

    let songs = fs.readdirSync('data/songs');
    for (let i = 0; i < songs.length; i++) {
        let orig = songs[i].replace('.mid', '');
        f.get(`/${orig}_:crc`, async (req, res) => {
            return res.sendFile(`data/songs/${songs[i]}`, process.cwd());
        });
    }

    next();
}
