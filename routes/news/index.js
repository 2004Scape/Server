export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('news/index');
    });

    f.get('/cs', async (req, res) => {
        return res.view('news/csindex');
    });

    f.get('/:id', async (req, res) => {
        return res.view(`news/post${req.params.id}.ejs`);
    });

    next();
}
