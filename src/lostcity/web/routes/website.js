import { WorldList, WorldListPlayers } from '#lostcity/engine/WorldList.js';

export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('index');
    });

    f.get('/title', async (req, res) => {
        return res.view('title', {
            playerCount: WorldListPlayers.length,
        });
    });

    f.get('/serverlist', async (req, res) => {
        if (typeof req.query['lores.x'] == 'undefined' && typeof req.query['hires.x'] == 'undefined') {
            return res.redirect(302, '/detail');
        }

        if (!req.query['lores.x'] && !req.query['hires.x']) {
            return res.redirect(302, '/detail');
        }

        if (typeof req.query.method == 'undefined' || !req.query.method.length) {
            return res.redirect(302, '/detail');
        }

        let members = WorldList.filter(x => x.members).length;
        let regions = {
            'East Coast (USA)': 'us',
        };
        let freeRegions = WorldList.filter(x => x.region && !x.members).map(x => x.region).filter((x, i, self) => self.indexOf(x) == i);
        let membersRegions = WorldList.filter(x => x.region && x.members).map(x => x.region).filter((x, i, self) => self.indexOf(x) == i);

        return res.view('serverlist', {
            detail: typeof req.query['hires.x'] !== 'undefined' ? 'high' : 'low',
            method: req.query.method,
            worlds: WorldList,
            members,
            regions,
            freeRegions,
            membersRegions
        });
    });

    f.get('/client', async (req, res) => {
        if (typeof req.query.detail == 'undefined' || !req.query.detail) {
            return res.redirect(302, '/detail');
        }

        if (typeof req.query.world == 'undefined' || !req.query.world) {
            return res.redirect(302, '/detail');
        }

        if (typeof req.query.method == 'undefined' || !req.query.method) {
            return res.redirect(302, '/detail');
        }

        let world = WorldList.find(x => x.id == req.query.world);
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

    f.get('/client-inner', async (req, res) => {
        if (typeof req.query.detail == 'undefined' || !req.query.detail) {
            return;
        }

        if (typeof req.query.world == 'undefined' || !req.query.world) {
            return;
        }

        if (typeof req.query.method == 'undefined' || !req.query.method) {
            return;
        }

        let world = WorldList.find(x => x.id == req.query.world);
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

    f.get('/play', async (req, res) => {
        return res.redirect('/detail');
    });

    f.get('/cookies', async (req, res) => {
        return res.view('cookies');
    });

    f.get('/copyright', async (req, res) => {
        return res.view('copyright');
    });

    f.get('/detail', async (req, res) => {
        return res.view('detail');
    });

    f.get('/banner', async (req, res) => {
        return res.view('banner');
    });

    f.get('/manual', async (req, res) => {
        return res.view('manual');
    });

    f.get('/privacy', async (req, res) => {
        return res.view('privacy');
    });

    f.get('/support', async (req, res) => {
        return res.view('support');
    });

    f.get('/terms', async (req, res) => {
        return res.view('terms');
    });

    f.get('/whychoosers', async (req, res) => {
        return res.view('whychoosers');
    });

    f.get('/worldmap', async (req, res) => {
        return res.view('worldmap');
    });

    f.get('/register', async (req, res) => {
        let { step, username, error } = req.query;

        if (typeof step === 'undefined') {
            step = 0;
        }
        step = parseInt(step);

        if (typeof error === 'undefined') {
            error = 0;
        }
        error = parseInt(error);

        if (username) {
            username = username.toLowerCase();
        }

        if (step > 3 || (step > 0 && !username)) {
            return res.redirect(301, '/register');
        }

        if (error == 1) {
            let suggestions = [];
            for (let i = 0; i < 5; ++i) {
                suggestions[i] = username + Math.ceil(Math.random() * 100);
            }

            return res.view('register', {
                step,
                username,
                error,
                suggestions
            });
        }

        if (username) {
            let exists = false;
            if (step > 0 && step < 3 && exists) {
                return res.redirect(301, '/register?username=' + encodeURIComponent(username) + '&error=1');
            }
        }

        return res.view('register', {
            step,
            username
        });
    });

    f.post('/register', async (req, res) => {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.redirect(301, '/register?username=' + encodeURIComponent(username) + '&step=2');
        }

        username = username.toLowerCase();
        return res.redirect(301, '/register?username=' + encodeURIComponent(username) + '&step=3');
    });

    next();
}
