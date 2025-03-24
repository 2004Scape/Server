import { locShapeLayer } from '@2004scape/rsmod-pathfinder';

import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import NonPathingEntity from '#/engine/entity/NonPathingEntity.js';

export default class Loc extends NonPathingEntity {
    // constructor properties
    private baseInfo: number;
    private currentInfo: number;

    constructor(level: number, x: number, z: number, width: number, length: number, lifecycle: EntityLifeCycle, type: number, shape: number, angle: number) {
        super(level, x, z, width, length, lifecycle);
        this.baseInfo = this.packInfo(type, shape, angle);
        this.currentInfo = this.baseInfo;
    }

    private packInfo(type: number, shape: number, angle: number): number {
        const layer: number = locShapeLayer(shape);
        // 16383, 31, 3, 3
        return (type & 0x3fff) | ((shape & 0x1f) << 14) | ((angle & 0x3) << 19) | ((layer & 0x3) << 21);
    }

    isChanged(): boolean {
        return this.currentInfo !== this.baseInfo;
    }

    get type(): number {
        return this.currentInfo & 0x3fff;
    }

    get shape(): number {
        return (this.currentInfo >> 14) & 0x1f;
    }

    get angle(): number {
        return (this.currentInfo >> 19) & 0x3;
    }

    get layer(): number {
        return (this.baseInfo >> 21) & 0x3;
    }

    change(type: number, shape: number, angle: number) {
        this.currentInfo = this.packInfo(type, shape, angle);
    }

    revert() {
        this.currentInfo = this.baseInfo;
    }
}
