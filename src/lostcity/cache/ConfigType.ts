import Packet from "#jagex2/io/Packet.js";

export abstract class ConfigType {
    readonly id: number;

    debugname: string | null = null;

    constructor(id: number) {
        this.id = id;
    }

    decodeType(packet: Packet): void {
        while (packet.available > 0) {
            let code = packet.g1();
            if (code === 0) {
                break;
            }

            this.decode(code, packet);
        }
    }

    abstract decode(opcode: number, packet: Packet): void;
}
