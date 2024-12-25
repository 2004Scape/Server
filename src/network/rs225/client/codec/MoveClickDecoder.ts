import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import MoveClick from '#/network/client/model/MoveClick.js';

export default class MoveClickDecoder extends MessageDecoder<MoveClick> {
    constructor(readonly prot: ClientProt) {
        super();
    }

    decode(buf: Packet) {
        const ctrlHeld: number = buf.g1();
        const startX: number = buf.g2();
        const startZ: number = buf.g2();

        const offset: number = this.prot === ClientProt.MOVE_MINIMAPCLICK ? 14 : 0;
        const waypoints: number = (buf.available - offset) >> 1;

        const path: { x: number, z: number}[] = [
            { x: startX, z: startZ }
        ];

        for (let index: number = 1; index <= waypoints && index < 25; index++) {
            path.push({
                x: startX + buf.g1b(),
                z: startZ + buf.g1b()
            });
        }

        return new MoveClick(path, ctrlHeld, this.prot === ClientProt.MOVE_OPCLICK);
    }
}
