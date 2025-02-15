import fs from 'fs';
import forge from 'node-forge';
import Environment from '#/util/Environment.js';
import { createHash } from 'crypto';
import { hostname } from 'os';

// Attempt to load the public.pem parameters:
const pubkey = forge.pki.publicKeyFromPem(
    Environment.STANDALONE_BUNDLE ?
        (await (await fetch('data/config/public.pem')).text()) :
        fs.readFileSync('data/config/public.pem', 'ascii')
);
const pubkeySha1 = createHash('sha1');
// token consists of both the RSA parameters (which are changed each release),
// alongside system hostname (to make this deterministic, yet unpredictable
// from client E/N alone). Can't be calculated offline, and server reboot won't
// invalidate it.
pubkeySha1.update(pubkey.n.toString(16));
pubkeySha1.update(pubkey.e.toString(16));
pubkeySha1.update(hostname());

// ie: "2d27cb4a0d6f4a542ff305096714bc1ec351e2a1" - any browser will support it
const publicPerDeploymentToken = pubkeySha1.digest().toString('hex');

/**
 * getPublicPerDeploymentToken returns a string unique to each individual
 * world, for each deployment (release).
*/
export function getPublicPerDeploymentToken() {
    return publicPerDeploymentToken;
}
