import crypto from 'crypto';

export function encrypt(value: string, passphrase: string): Uint8Array | null {
    try {
        const iv = crypto.randomBytes(16);
        const key = crypto.createHash('sha256').update(passphrase).digest();
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        return new Uint8Array(Buffer.concat([iv, Buffer.concat([cipher.update(value), cipher.final()])]));
    } catch (err) {
        console.error(err);
    }
    return null;
}

export function decrypt(bytes: Uint8Array, passphrase: string): string | null {
    try {
        const iv = bytes.subarray(0, 16);
        const key = crypto.createHash('sha256').update(passphrase).digest();
        const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        return Buffer.concat([cipher.update(bytes.subarray(16)), cipher.final()]).toString();
    } catch (err) {
        console.error(err);
    }
    return null;
}
