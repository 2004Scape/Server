import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import NonPathingEntity from '#/engine/entity/NonPathingEntity.js';

export default class Loc extends NonPathingEntity {
    // constructor properties
    private info: number;
    private tempinfo: number;

    constructor(level: number, x: number, z: number, width: number, length: number, lifecycle: EntityLifeCycle, type: number, shape: number, angle: number) {
        super(level, x, z, width, length, lifecycle);
        // 16383, 31, 3
        this.info = (type & 0x3fff) | ((shape & 0x1f) << 14) | ((angle & 0x3) << 19);
        this.tempinfo = -1;
    }

    private get currentinfo() {
        if (this.tempinfo !== -1) {
            return this.tempinfo;
        }
        return this.info;
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

    change(type: number, shape: number, angle: number) {
        if (this.lifecycle === EntityLifeCycle.RESPAWN) {
            this.tempinfo = (type & 0x3fff) | ((shape & 0x1f) << 14) | ((angle & 0x3) << 19);
        } else if (this.lifecycle === EntityLifeCycle.DESPAWN) {
            this.info = (type & 0x3fff) | ((shape & 0x1f) << 14) | ((angle & 0x3) << 19);
        }
    }

    revert() {
        this.tempinfo = -1;
    }
}
