export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('about/index');
    });

    f.get('/getstart', async (req, res) => {
        return res.view('about/getstart');
    });

    f.get('/virtual', async (req, res) => {
        return res.view('about/virtual');
    });

    f.get('/whatisrs', async (req, res) => {
        return res.view('about/whatisrs');
    });

    next();
}
