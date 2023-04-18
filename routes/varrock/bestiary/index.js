export default function (f, opts, next) {
    f.get('/:page', async (req, res) => {
        return res.view(`varrock/bestiary/${req.params.page}.ejs`);
    });

    next();
}
