export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('guides/index');
    });

    f.get('/abuse', async (req, res) => {
        return res.view('guides/abuse');
    });

    f.get('/epilepsy', async (req, res) => {
        return res.view('guides/epilepsy');
    });

    f.get('/responsible', async (req, res) => {
        return res.view('guides/responsible');
    });

    f.get('/rules', async (req, res) => {
        return res.view('guides/rules');
    });

    f.get('/safety', async (req, res) => {
        return res.view('guides/safety');
    });

    f.get('/scam', async (req, res) => {
        return res.view('guides/scam');
    });

    f.get('/securetips', async (req, res) => {
        return res.view('guides/securetips');
    });

    next();
}
