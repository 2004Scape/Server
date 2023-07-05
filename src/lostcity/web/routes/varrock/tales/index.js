export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('varrock/tales/index');
    });

    f.get('/:id', async (req, res) => {
        return res.view(`varrock/tales/tale${req.params.id}.ejs`);
    });

    next();
}
