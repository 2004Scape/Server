import fs from 'fs';
import { CrcBuffer } from '#lostcity/cache/CrcTable.js';

export default function (f, opts, next) {
    if (!fs.existsSync('data/pack/client')) {
        next();
        return;
    }

    f.get('/crc:rand', async (req, res) => {
        res.header('Content-Type', 'application/octet-stream');
        return Buffer.from(CrcBuffer.data);
    });

    f.get('/title:crc', async (req, res) => {
        return res.sendFile('data/pack/client/title', process.cwd());
    });

    f.get('/config:crc', async (req, res) => {
        return res.sendFile('data/pack/client/config', process.cwd());
    });

    f.get('/interface:crc', async (req, res) => {
        return res.sendFile('data/pack/client/interface', process.cwd());
    });

    f.get('/media:crc', async (req, res) => {
        return res.sendFile('data/pack/client/media', process.cwd());
    });

    f.get('/models:crc', async (req, res) => {
        return res.sendFile('data/pack/client/models', process.cwd());
    });

    f.get('/sounds:crc', async (req, res) => {
        return res.sendFile('data/pack/client/sounds', process.cwd());
    });

    f.get('/textures:crc', async (req, res) => {
        return res.sendFile('data/pack/client/textures', process.cwd());
    });

    f.get('/wordenc:crc', async (req, res) => {
        return res.sendFile('data/pack/client/wordenc', process.cwd());
    });

    let songs = fs.readdirSync('data/pack/client/songs');
    for (let i = 0; i < songs.length; i++) {
        let orig = songs[i].replace('.mid', '');
        f.get(`/${orig}_:crc`, async (req, res) => {
            return res.sendFile(`data/pack/client/songs/${songs[i]}`, process.cwd());
        });
    }

    if (fs.existsSync('data/pack/mapview/worldmap.jag')) {
        f.get('/worldmap.jag:sha', async (req, res) => {
            return res.sendFile('data/pack/mapview/worldmap.jag', process.cwd());
        });
    }

    next();
}
