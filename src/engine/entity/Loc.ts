import { locShapeLayer } from '@2004scape/rsmod-pathfinder';

import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import NonPathingEntity from '#/engine/entity/NonPathingEntity.js';

export default class Loc extends NonPathingEntity {
    // constructor properties
    private info: number;
    private tempinfo: number;

    constructor(level: number, x: number, z: number, width: number, length: number, lifecycle: EntityLifeCycle, type: number, shape: number, angle: number) {
        super(level, x, z, width, length, lifecycle);
        this.info = this.packInfo(type, shape, angle);
        this.tempinfo = -1;
    }

    private get currentinfo() {
        if (this.tempinfo !== -1) {
            return this.tempinfo;
        }
        return this.info;
    }

    private packInfo(type: number, shape: number, angle: number): number {
        const layer: number = locShapeLayer(shape);
        // 16383, 31, 3, 3
        return (type & 0x3fff) | ((shape & 0x1f) << 14) | ((angle & 0x3) << 19) | ((layer & 0x3) << 21);
    }

    isChanged(): boolean {
        return this.tempinfo !== -1;
    }

    get type(): number {
        return this.currentinfo & 0x3fff;
    }

    get shape(): number {
        return (this.currentinfo >> 14) & 0x1f;
    }

    get angle(): number {
        return (this.currentinfo >> 19) & 0x3;
    }

    get layer(): number {
        return (this.info >> 21) & 0x3;
    }

    change(type: number, shape: number, angle: number) {
        // Static locs set the temp bits
        if (this.lifecycle === EntityLifeCycle.RESPAWN) {
            this.tempinfo = this.packInfo(type, shape, angle);
        }
        // Dynamic locs set their real bits
        else if (this.lifecycle === EntityLifeCycle.DESPAWN) {
            this.info = this.packInfo(type, shape, angle);
        }
    }

    revert() {
        this.tempinfo = -1;
    }
}
