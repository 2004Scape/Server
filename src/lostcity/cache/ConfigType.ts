import Packet2 from '#jagex2/io/Packet2.js';

export abstract class ConfigType {
    readonly id: number;

    debugname: string | null = null;

    constructor(id: number) {
        this.id = id;
    }

    abstract decode(code: number, dat: Packet2): void;

    decodeType(dat: Packet2): void {
        while (dat.available > 0) {
            const code: number = dat.g1();
            if (code === 0) {
                break;
            }

            this.decode(code, dat);
        }
    }
}
