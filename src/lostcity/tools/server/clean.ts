import fs from 'fs';

function rmIfExists(path: string) {
    if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true });
    }
}

// clean up server cache in case statSync.mtimeMs is not letting it update
rmIfExists('data/pack/server/');

// clean up server packfiles, we can regen these safely, sometimes it can have old data inside
rmIfExists('data/pack/category.pack');
rmIfExists('data/pack/enum.pack');
rmIfExists('data/pack/inv.pack');
rmIfExists('data/pack/param.pack');
rmIfExists('data/pack/script.pack');
rmIfExists('data/pack/struct.pack');
rmIfExists('data/pack/mesanim.pack');
rmIfExists('data/pack/dbrow.pack');
rmIfExists('data/pack/dbtable.pack');

// these get rebuilt anyways but since we're here...
rmIfExists('data/symbols/');

rmIfExists('dump');
