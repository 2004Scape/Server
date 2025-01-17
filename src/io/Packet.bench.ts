import { Bench } from 'tinybench';

import Packet from '#/io/Packet.js';

const bench = new Bench();

const bitbuffer: Packet = Packet.alloc(40000);
bench.add('bit write', (): void => {
    bitbuffer.bitPos = 0;

    for (let i: number = 0; i < 45714; i++) {
        bitbuffer.pBit(7, 100);
    }
});

bench.add('bit read', (): void => {
    bitbuffer.bitPos = 0;

    for (let i: number = 0; i < 45714; i++) {
        bitbuffer.gBit(7);
    }
});

await bench.run();

console.table(bench.table());
