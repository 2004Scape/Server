import fs from 'fs';

export default function (f, opts, next) {
    if (!fs.existsSync('data/pack/server')) {
        next();
        return;
    }

    let files = fs.readdirSync('data/pack/server');
    for (let i = 0; i < files.length; i++) {
        f.get(`/${files[i]}`, async (req, res) => {
            return res.sendFile(`data/pack/server/${files[i]}`, process.cwd());
        });
    }

    next();
}
