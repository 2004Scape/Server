import fs from 'fs';

function rmIfExists(path: string) {
    if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true });
    }
}

rmIfExists('data/pack/client/');
rmIfExists('dump/');
