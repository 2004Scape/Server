export default class InputTrackingBlob {
    readonly seq: number;
    readonly data: string;
    readonly coord?: number;

    constructor(data: Uint8Array, seq: number, coord?: number) {
        this.seq = seq;
        this.data = Buffer.from(data).toString('base64');
        this.coord = coord;
    }
}
