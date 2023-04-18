export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('polls/index');
    });

    f.get('/:id', async (req, res) => {
        return res.view(`polls/poll${req.params.id}.ejs`);
    });

    next();
}
