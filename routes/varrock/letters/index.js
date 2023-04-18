export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('varrock/letters/index');
    });

    f.get('/:id', async (req, res) => {
        return res.view(`varrock/letters/letter${req.params.id}.ejs`);
    });

    next();
}
