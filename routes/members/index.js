export default function (f, opts, next) {
    f.get('/', async (req, res) => {
        return res.view('members/index');
    });

    next();
}
