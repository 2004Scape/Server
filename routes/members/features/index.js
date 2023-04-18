export default function (f, opts, next) {
    f.get('/adfree', async (req, res) => {
        return res.view('members/features/adfree');
    });

    f.get('/agility', async (req, res) => {
        return res.view('members/features/agility');
    });

    f.get('/bank', async (req, res) => {
        return res.view('members/features/bank');
    });

    f.get('/crafting', async (req, res) => {
        return res.view('members/features/crafting');
    });

    f.get('/duelling', async (req, res) => {
        return res.view('members/features/duelling');
    });

    f.get('/fishing', async (req, res) => {
        return res.view('members/features/fishing');
    });

    f.get('/fletching', async (req, res) => {
        return res.view('members/features/fletching');
    });

    f.get('/herblaw', async (req, res) => {
        return res.view('members/features/herblaw');
    });

    f.get('/magic', async (req, res) => {
        return res.view('members/features/magic');
    });

    f.get('/morelocations', async (req, res) => {
        return res.view('members/features/morelocations');
    });

    f.get('/moremonsters', async (req, res) => {
        return res.view('members/features/moremonsters');
    });

    f.get('/morequests', async (req, res) => {
        return res.view('members/features/morequests');
    });

    f.get('/payoptions', async (req, res) => {
        return res.view('members/features/payoptions');
    });

    f.get('/sounds', async (req, res) => {
        return res.view('members/features/sounds');
    });

    f.get('/thieving', async (req, res) => {
        return res.view('members/features/thieving');
    });

    f.get('/weapons', async (req, res) => {
        return res.view('members/features/weapons');
    });

    f.get('/whatis', async (req, res) => {
        return res.view('members/features/whatis');
    });

    next();
}
