export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('varrock/index');
    });

    next();
}
