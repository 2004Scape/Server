import WorldList from '#lostcity/engine/WorldList.js';

export default function (f: any, opts: any, next: any) {
    f.get('/banner', async (req: any, res: any) => {
        return res.view('banner');
    });

    f.get('/client', async (req: any, res: any) => {
        if (typeof req.query.detail == 'undefined' || !req.query.detail) {
            return res.redirect(302, '/detail');
        }

        if (typeof req.query.world == 'undefined' || !req.query.world) {
            return res.redirect(302, '/detail');
        }

        if (typeof req.query.method == 'undefined' || !req.query.method) {
            return res.redirect(302, '/detail');
        }

        const world = WorldList.find(x => x.id == req.query.world);
        if (!world) {
            return res.redirect(302, '/detail');
        }

        if (req.query.method == 0) {
            return res.view('webclient', {
                world,
                detail: req.query.detail,
                method: req.query.method,
            });
        } else if (req.query.method == 1) {
            return res.redirect('/client/rs2-client.jar');
        } else if (req.query.method == 2) {
            return res.view('javaclient', {
                world,
                detail: req.query.detail,
                method: req.query.method,
            });
        }
    });

    f.get('/client-inner', async (req: any, res: any) => {
        if (typeof req.query.detail == 'undefined' || !req.query.detail) {
            return;
        }

        if (typeof req.query.world == 'undefined' || !req.query.world) {
            return;
        }

        if (typeof req.query.method == 'undefined' || !req.query.method) {
            return;
        }

        const world = WorldList.find(x => x.id == req.query.world);
        if (!world) {
            return;
        }

        if (req.query.method == 0) {
            return res.view('webclient-inner', {
                world,
                detail: req.query.detail,
                method: req.query.method,
            });
        } else if (req.query.method == 2) {
            return res.view('javaclient-inner', {
                world,
                detail: req.query.detail,
                method: req.query.method,
            });
        }
    });

    next();
}
