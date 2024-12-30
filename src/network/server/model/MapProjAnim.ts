import ZoneMessage from '#/network/server/ZoneMessage.js';
import {CoordGrid} from '#/engine/CoordGrid.js';

export default class MapProjAnim extends ZoneMessage {
    constructor(
        readonly srcX: number,
        readonly srcZ: number,
        readonly dstX: number,
        readonly dstZ: number,
        readonly target: number,
        readonly spotanim: number,
        readonly srcHeight: number,
        readonly dstHeight: number,
        readonly startDelay: number,
        readonly endDelay: number,
        readonly peak: number,
        readonly arc: number
    ) {
        super(CoordGrid.packZoneCoord(srcX, srcZ));
    }
}