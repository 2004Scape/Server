export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('faq/index');
    });

    f.get('/billing', async (req, res) => {
        return res.view('faq/billing');
    });

    f.get('/fansite', async (req, res) => {
        return res.view('faq/fansite');
    });

    f.get('/game', async (req, res) => {
        return res.view('faq/game');
    });

    f.get('/technical', async (req, res) => {
        return res.view('faq/technical');
    });

    next();
}
