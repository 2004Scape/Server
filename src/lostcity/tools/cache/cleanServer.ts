import fs from 'fs';

function rmIfExists(path: string) {
    if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true });
    }
}

// clean up server cache in case statSync.mtimeMs is not letting it update
rmIfExists('data/pack/server/');

// clean up server packfiles, we can regen these safely, sometimes it can have old data inside
rmIfExists('data/src/pack/category.pack');
rmIfExists('data/src/pack/enum.pack');
rmIfExists('data/src/pack/param.pack');
rmIfExists('data/src/pack/script.pack');
rmIfExists('data/src/pack/struct.pack');
rmIfExists('data/src/pack/mesanim.pack');
rmIfExists('data/src/pack/dbrow.pack');
rmIfExists('data/src/pack/dbtable.pack');
rmIfExists('data/src/pack/hunt.pack');

// these get rebuilt anyways but since we're here...
rmIfExists('data/symbols/');
