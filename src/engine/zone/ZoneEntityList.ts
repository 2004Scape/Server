import Loc from '#/engine/entity/Loc.js';
import Obj from '#/engine/entity/Obj.js';
import ObjType from '#/cache/config/ObjType.js';
import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';

export default abstract class ZoneEntityList<T> extends Array<T[] | undefined> {
    private readonly capacity: number;
    private readonly onFilled: (item: T) => void;

    constructor(capacity: number, onFilled: (item: T) => void) {
        super();
        this.capacity = capacity;
        this.onFilled = onFilled;
    }

    /**
     * Returns what is the top most item in this zone list on the specified coord.
     * Does not necessarily represent what is the top most item in the list for this coord.
     * @param coord The coord to return the item on the tile stack.
     */
    protected abstract nextTopStack(coord: number): T | undefined;

    /**
     * Returns what is the bottom most item in this zone list.
     */
    protected abstract nextBottomAll(): T | undefined;

    // ----

    *stack(coord: number): IterableIterator<T> {
        const items: T[] | undefined = this[coord];
        if (typeof items === 'undefined') {
            return;
        }
        for (let index: number = 0; index < items.length; index++) {
            yield items[index];
        }
    }

    *all(reverse: boolean = false): IterableIterator<T> {
        for (let index: number = 0; index < this.length; index++) {
            const items: T[] | undefined = this[index];
            if (typeof items === 'undefined') {
                continue;
            }
            if (reverse) {
                for (let i: number = items.length - 1; i >= 0; i--) {
                    yield items[i];
                }
            } else {
                for (let i: number = 0; i < items.length; i++) {
                    yield items[i];
                }
            }
        }
    }

    // ----

    addLast(coord: number, item: T, unchecked: boolean = false): void {
        this.check(coord, unchecked);
        this[coord]?.push(item);
    }

    addFirst(coord: number, item: T, unchecked: boolean = false): void {
        this.check(coord, unchecked);
        this[coord]?.unshift(item);
    }

    sortStack(coord: number, unchecked: boolean = false): void {
        const top: T | undefined = this.nextTopStack(coord);
        if (typeof top === 'undefined') {
            return;
        }
        const items: T[] | undefined = this[coord];
        if (typeof items === 'undefined') {
            return;
        }
        if (items[0] !== top) {
            this.remove(coord, top);
            this.addFirst(coord, top, unchecked);
        }
    }

    remove(coord: number, item: T): void {
        const items: T[] | undefined = this[coord];
        if (typeof items === 'undefined') {
            return;
        }
        const index: number = items.indexOf(item);
        if (index === -1) {
            return;
        }
        items.splice(index, 1);
    }

    contains(coord: number, item: T): boolean {
        const items: T[] | undefined = this[coord];
        if (typeof items === 'undefined') {
            return false;
        }
        return items.indexOf(item) !== -1;
    }

    private check(coord: number, unchecked: boolean): void {
        const items: T[] | undefined = this[coord];
        if (typeof items === 'undefined') {
            this[coord] = [];
        }
        if (!unchecked && this.total === this.capacity) {
            const bottom: T | undefined = this.nextBottomAll();
            if (typeof bottom !== 'undefined') {
                this.onFilled(bottom);
            }
        }
    }

    private get total(): number {
        let total: number = 0;
        for (let index: number = 0; index < this.length; index++) {
            const items: T[] | undefined = this[index];
            if (typeof items === 'undefined') {
                continue;
            }
            total += items.length;
        }
        return total;
    }
}

export class LocList extends ZoneEntityList<Loc> {
    protected nextTopStack(coord: number): Loc | undefined {
        const locs: Loc[] | undefined = this[coord];
        if (typeof locs === 'undefined') {
            return undefined;
        }

        let topCost: number = -99999999;
        let topLoc: Loc | undefined;

        for (const loc of locs) {
            const cost: number = loc.lifecycle;
            if (cost > topCost) {
                topCost = cost;
                topLoc = loc;
            }
        }
        return topLoc;
    }

    protected nextBottomAll(): Loc | undefined {
        let bottomCost: number = Number.POSITIVE_INFINITY;
        let bottomLoc: Loc | undefined;

        for (let index: number = 0; index < this.length; index++) {
            const locs: Loc[] | undefined = this[index];
            if (typeof locs === 'undefined') {
                continue;
            }

            for (const loc of locs) {
                if (bottomCost === 0) {
                    break;
                }

                if (loc.lifecycle !== EntityLifeCycle.DESPAWN) {
                    continue;
                }

                const cost: number = loc.lifecycle;
                if (cost < bottomCost) {
                    bottomCost = cost;
                    bottomLoc = loc;
                }
            }
        }
        return bottomLoc;
    }
}

export class ObjList extends ZoneEntityList<Obj> {
    protected nextTopStack(coord: number): Obj | undefined {
        const objs: Obj[] | undefined = this[coord];
        if (typeof objs === 'undefined') {
            return undefined;
        }

        let topCost: number = -99999999;
        let topObj: Obj | undefined;

        for (const obj of objs) {
            const type: ObjType = ObjType.get(obj.type);
            let cost: number = type.cost;

            if (type.stackable) {
                cost *= obj.count + 1;
            }

            cost += obj.lifecycle;

            if (cost > topCost) {
                topCost = cost;
                topObj = obj;
            }
        }
        return topObj;
    }

    protected nextBottomAll(): Obj | undefined {
        let bottomCost: number = Number.POSITIVE_INFINITY;
        let bottomObj: Obj | undefined;

        for (let index: number = 0; index < this.length; index++) {
            const objs: Obj[] | undefined = this[index];
            if (typeof objs === 'undefined') {
                continue;
            }

            for (const obj of objs) {
                if (bottomCost === 0) {
                    break;
                }

                if (obj.lifecycle !== EntityLifeCycle.DESPAWN) {
                    continue;
                }

                const type: ObjType = ObjType.get(obj.type);
                let cost: number = type.cost;

                if (type.stackable) {
                    cost *= obj.count + 1;
                }

                cost += obj.lifecycle;

                if (cost < bottomCost) {
                    bottomCost = cost;
                    bottomObj = obj;
                }
            }
        }
        return bottomObj;
    }
}
