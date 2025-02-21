import NonPathingEntity from '#/engine/entity/NonPathingEntity.js';
import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import { LocAngle, LocLayer, LocShape, locShapeLayer } from '@2004scape/rsmod-pathfinder';

export default class Loc extends NonPathingEntity {
    // constructor properties
    private readonly info: number;

    constructor(level: number, x: number, z: number, width: number, length: number, lifecycle: EntityLifeCycle, type: number, shape: number, angle: number) {
        super(level, x, z, width, length, lifecycle);
        const layer: number = locShapeLayer(shape);
        // 16383, 31, 3, 3
        this.info = (type & 0x3fff) | ((shape & 0x1f) << 14) | ((angle & 0x3) << 19) | ((layer & 0x3) << 21);
    }

    get type(): number {
        return this.info & 0x3fff;
    }

    get shape(): LocShape {
        return (this.info >> 14) & 0x1f;
    }

    get angle(): LocAngle {
        return (this.info >> 19) & 0x3;
    }

    get layer(): LocLayer {
        return (this.info >> 21) & 0x3;
    }
}
