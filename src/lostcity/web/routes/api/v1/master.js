import WorldList from '#lostcity/engine/WorldList.js';

export default function (f, opts, next) {
    f.get('/worldlist', async (req, res) => {
        return WorldList;
    });

    next();
}
