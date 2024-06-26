import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import RebuildNormal from '#lostcity/network/outgoing/model/RebuildNormal.js';
import {Position} from '#lostcity/entity/Position.js';
import {PRELOADED_CRC} from '#lostcity/server/PreloadedPacks.js';

type MapSquare = {
    x: number;
    z: number;
}

export default class RebuildNormalEncoder extends MessageEncoder<RebuildNormal> {
    prot = ServerProt.REBUILD_NORMAL;

    encode(buf: Packet, message: RebuildNormal): void {
        const {zoneX, zoneZ} = message;

        buf.p2(zoneX);
        buf.p2(zoneZ);

        // build area is 13x13 zones (8*13 = 104 tiles), so we need to load 6 zones in each direction
        const squares: MapSquare[] = [];
        for (let x: number = zoneX - 6; x <= zoneX + 6; x++) {
            const mx: number = Position.mapsquare(x << 3);
            for (let z: number = zoneZ - 6; z <= zoneZ + 6; z++) {
                const mz: number = Position.mapsquare(z << 3);

                if (squares.findIndex(mapsquare => mapsquare.x === mx && mapsquare.z === mz) === -1) {
                    squares.push({ x: mx, z: mz });
                }
            }
        }

        for (const mapsquare of squares) {
            buf.p1(mapsquare.x);
            buf.p1(mapsquare.z);
            buf.p4(PRELOADED_CRC.get(`m${mapsquare.x}_${mapsquare.z}`) ?? 0);
            buf.p4(PRELOADED_CRC.get(`l${mapsquare.x}_${mapsquare.z}`) ?? 0);
        }
    }
}