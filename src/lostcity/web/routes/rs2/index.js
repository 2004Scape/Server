export default function (f, opts, next) {
    f.get('/credits', async (req, res) => {
        return res.view('rs2/credits');
    });

    next();
}
