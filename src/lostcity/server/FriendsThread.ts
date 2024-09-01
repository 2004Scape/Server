import fs from 'fs';
import forge from 'node-forge';
import { parentPort } from 'worker_threads';

if (typeof self === 'undefined') {
    if (!parentPort) throw new Error('This file must be run as a worker thread.');

    const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));

    parentPort.on('message', async msg => {
        try {
            if (!parentPort) throw new Error('This file must be run as a worker thread.');
            await handleRequests(parentPort, msg, priv);
        } catch (err) {
            console.error(err);
        }
    });
} else {
    const priv = forge.pki.privateKeyFromPem(await (await fetch('data/config/private.pem')).text());

    self.onmessage = async msg => {
        try {
            await handleRequests(self, msg.data, priv);
        } catch (err) {
            console.error(err);
        }
    };
}

type ParentPort = {
    postMessage: (msg: any) => void;
};

async function handleRequests(parentPort: ParentPort, msg: any, priv: forge.pki.rsa.PrivateKey) {
    switch (msg.type) {
        default:
            console.error('Unknown message type: ' + msg.type);
            break;
    }
}
