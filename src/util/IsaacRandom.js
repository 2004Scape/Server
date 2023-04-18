export class IsaacRandom {
    static SIZE = 256;
    static GOLDEN_RATIO = 0x9E3779B9;

    count = 0;
    a = 0;
    b = 0;
    c = 0;
    mem = new Int32Array(IsaacRandom.SIZE);
    rsl = new Int32Array(IsaacRandom.SIZE);

    constructor(seed) {
        if (seed && seed.length) {
            for (let i = 0; i < seed.length; i++) {
                this.rsl[i] = seed[i];
            }
        }

        this.init();
    }

    isaac() {
        this.c++;
        this.b += this.c;

        for (let i = 0; i < IsaacRandom.SIZE; i++) {
            const x = this.mem[i];

            switch (i & 3) {
                case 0:
                    this.a ^= this.a << 13;
                    break;
                case 1:
                    this.a ^= this.a >>> 6;
                    break;
                case 2:
                    this.a ^= this.a << 2;
                    break;
                case 3:
                    this.a ^= this.a >>> 16;
                    break;
            }

            this.a += this.mem[(i + 128) & 0xFF];

            let y;
            this.mem[i] = y = this.mem[(x >>> 2) & 0xFF] + this.a + this.b;
            this.rsl[i] = this.b = this.mem[(y >>> 10) & 0xFF] + x;
        }
    }

    init() {
        let a = IsaacRandom.GOLDEN_RATIO;
        let b = IsaacRandom.GOLDEN_RATIO;
        let c = IsaacRandom.GOLDEN_RATIO;
        let d = IsaacRandom.GOLDEN_RATIO;
        let e = IsaacRandom.GOLDEN_RATIO;
        let f = IsaacRandom.GOLDEN_RATIO;
        let g = IsaacRandom.GOLDEN_RATIO;
        let h = IsaacRandom.GOLDEN_RATIO;

        for (let i = 0; i < 4; i++) {
            a ^= b << 11;
            d += a;
            b += c;

            b ^= c >>> 2;
            e += b;
            c += d;

            c ^= d << 8;
            f += c;
            d += e;

            d ^= e >>> 16;
            g += d;
            e += f;

            e ^= f << 10;
            h += e;
            f += g;

            f ^= g >>> 4;
            a += f;
            g += h;

            g ^= h << 8;
            b += g;
            h += a;

            h ^= a >>> 9;
            c += h;
            a += b;
        }

        for (let i = 0; i < IsaacRandom.SIZE; i += 8) {
            a += this.rsl[i];
            b += this.rsl[i + 1];
            c += this.rsl[i + 2];
            d += this.rsl[i + 3];
            e += this.rsl[i + 4];
            f += this.rsl[i + 5];
            g += this.rsl[i + 6];
            h += this.rsl[i + 7];

            a ^= b << 11;
            d += a;
            b += c;

            b ^= c >>> 2;
            e += b;
            c += d;

            c ^= d << 8;
            f += c;
            d += e;

            d ^= e >>> 16;
            g += d;
            e += f;

            e ^= f << 10;
            h += e;
            f += g;

            f ^= g >>> 4;
            a += f;
            g += h;

            g ^= h << 8;
            b += g;
            h += a;

            h ^= a >>> 9;
            c += h;
            a += b;

            this.mem[i] = a;
            this.mem[i + 1] = b;
            this.mem[i + 2] = c;
            this.mem[i + 3] = d;
            this.mem[i + 4] = e;
            this.mem[i + 5] = f;
            this.mem[i + 6] = g;
            this.mem[i + 7] = h;
        }

        for (let i = 0; i < IsaacRandom.SIZE; i += 8) {
            a += this.mem[i];
            b += this.mem[i + 1];
            c += this.mem[i + 2];
            d += this.mem[i + 3];
            e += this.mem[i + 4];
            f += this.mem[i + 5];
            g += this.mem[i + 6];
            h += this.mem[i + 7];

            a ^= b << 11;
            d += a;
            b += c;

            b ^= c >>> 2;
            e += b;
            c += d;

            c ^= d << 8;
            f += c;
            d += e;

            d ^= e >>> 16;
            g += d;
            e += f;

            e ^= f << 10;
            h += e;
            f += g;

            f ^= g >>> 4;
            a += f;
            g += h;

            g ^= h << 8;
            b += g;
            h += a;

            h ^= a >>> 9;
            c += h;
            a += b;

            this.mem[i] = a;
            this.mem[i + 1] = b;
            this.mem[i + 2] = c;
            this.mem[i + 3] = d;
            this.mem[i + 4] = e;
            this.mem[i + 5] = f;
            this.mem[i + 6] = g;
            this.mem[i + 7] = h;
        }

        this.isaac();
        this.count = IsaacRandom.SIZE;
    }

    nextInt() {
        if (this.count-- == 0) {
            this.isaac();
            this.count = IsaacRandom.SIZE - 1;
        }

        return this.rsl[this.count] ?? 0;
    }
}
