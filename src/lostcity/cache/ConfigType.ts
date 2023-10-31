import Packet from '#jagex2/io/Packet.js';

export abstract class ConfigType {
    readonly id: number;

    debugname: string | null = null;

    constructor(id: number) {
        this.id = id;
    }

    abstract decode(opcode: number, packet: Packet): void;

    decodeType(packet: Packet): void {
        while (packet.available > 0) {
            const opcode = packet.g1();
            if (opcode === 0) {
                break;
            }

            this.decode(opcode, packet);
        }
    }
}
