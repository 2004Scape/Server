export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        if (req.query.user && req.query.category) {
            return res.view('hiscores/user');
        } else if (req.query.user) {
            return res.view('hiscores/personal');
        } else if (req.query.category) {
            return res.view('hiscores/index' + req.query.category);
        } else {
            return res.view('hiscores/index');
        }
    });

    next();
}
