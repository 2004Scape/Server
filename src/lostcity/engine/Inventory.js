import InvType from '#lostcity/cache/InvType.js';
import ObjType from '#lostcity/cache/ObjType.js';

export class InventoryTransaction {
    requested = [];
    completed = 0;
    items = [];

    constructor(requested, completed = 0, items = []) {
        this.requested = requested;
        this.completed = completed;
        this.items = items;
    }

    getLeftOver() {
        return this.requested - this.completed;
    }

    hasSucceeded() {
        return this.completed == this.requested;
    }

    hasFailed() {
        return !this.hasSucceeded();
    }

    revert(from) {
        for (let i = 0; i < this.items.length; i++) {
            from.remove(this.items[i].item, this.items[i].slot);
        }
    }
}

export class Inventory {
    static STACK_LIMIT = 0x7FFFFFFF - 1;

    static NORMAL_STACK = 0;
    static ALWAYS_STACK = 1;
    static NEVER_STACK = 2;

    // 0 - stack based on item
    // 1 - always stack
    // 2 - never stack
    stackType = Inventory.NORMAL_STACK;

    capacity = 0;
    items = [];
    update = false;

    com = -1; // component to display on
    type = -1; // inv ID

    static fromType(inv) {
        let type = InvType.getByName(inv);

        let stackType = Inventory.NORMAL_STACK;
        if (type.stackall) {
            stackType = Inventory.ALWAYS_STACK;
        }

        let container = new Inventory(type.size, stackType);
        container.type = type.id;
        return container;
    }

    constructor(capacity, stackType = Inventory.NORMAL_STACK) {
        this.capacity = capacity;
        this.stackType = stackType;

        for (let i = 0; i < capacity; i++) {
            this.items.push(null);
        }
    }

    contains(id) {
        return this.items.some(item => item && item.id == id);
    }

    hasAt(slot, id) {
        return this.items[slot] && this.items[slot].id == id;
    }

    nextFreeSlot() {
        for (let i = 0; i < this.capacity; i++) {
            if (this.items[i] == null) {
                return i;
            }
        }

        return -1;
    }

    freeSlotCount() {
        return this.items.filter(item => item == null).length;
    }

    occupiedSlotCount() {
        return this.items.filter(item => item != null).length;
    }

    isFull() {
        return this.occupiedSlotCount() == this.capacity;
    }

    isEmpty() {
        return this.occupiedSlotCount() == 0;
    }

    hasAny() {
        return this.items.some(item => item != null);
    }

    hasSpace() {
        return this.nextFreeSlot() != -1;
    }

    getItemCount(id) {
        let count = 0;

        for (let i = 0; i < this.capacity; i++) {
            if (this.items[i] && this.items[i].id == id) {
                count += this.items[i].count;
            }
        }

        return Math.min(Inventory.STACK_LIMIT, count);
    }

    getItemIndex(id) {
        return this.items.findIndex(item => item && item.id == id);
    }

    removeAll() {
        for (let i = 0; i < this.capacity; i++) {
            this.items[i] = null;
        }
        this.update = true;
    }

    add(id, count = 1, beginSlot = -1, assureFullInsertion = true, forceNoStack = false) {
        let type = ObjType.get(id);
        let stack = !forceNoStack && this.stackType != Inventory.NEVER_STACK && (type.stackable || this.stackType == Inventory.ALWAYS_STACK);

        let previousCount = 0;
        if (stack) {
            previousCount = this.getItemCount(id);
        }

        if (previousCount == Inventory.STACK_LIMIT) {
            return new InventoryTransaction(count, 0, []);
        }

        let freeSlotCount = this.freeSlotCount();
        if (freeSlotCount == 0 && (!stack || (stack && previousCount == 0))) {
            return new InventoryTransaction(count, 0, []);
        }

        if (assureFullInsertion) {
            if (stack && previousCount > Inventory.STACK_LIMIT - count) {
                return new InventoryTransaction(count, 0, []);
            }

            if (!stack && count > freeSlotCount) {
                return new InventoryTransaction(count, 0, []);
            }
        } else {
            if (stack && previousCount == Inventory.STACK_LIMIT) {
                return new InventoryTransaction(count, 0, []);
            } else if (!stack && freeSlotCount == 0) {
                return new InventoryTransaction(count, 0, []);
            }
        }

        let completed = 0;
        let added = [];

        if (!stack) {
            let startSlot = Math.max(0, beginSlot);

            for (let i = startSlot; i < this.capacity; i++) {
                if (this.items[i] != null) {
                    continue;
                }

                let add = { id, count: 1 };
                this.set(i, add);
                added.push({ slot: i, item: add });

                if (++completed >= count) {
                    break;
                }
            }
        } else {
            let stackIndex = this.getItemIndex(id);

            if (stackIndex == -1) {
                if (beginSlot == -1) {
                    stackIndex = this.nextFreeSlot();
                } else {
                    for (let i = beginSlot; i < this.capacity; i++) {
                        if (this.items[i] == null) {
                            stackIndex = i;
                            break;
                        }
                    }
                }

                if (stackIndex == -1) {
                    return new InventoryTransaction(count, completed, []);
                }
            }

            let stackCount = this.get(stackIndex)?.count ?? 0;
            let total = Math.min(Inventory.STACK_LIMIT, stackCount + count);

            let add = { id, count: total };
            this.set(stackIndex, add);
            added.push({ slot: stackIndex, item: add });
            completed = total - stackCount;
        }

        return new InventoryTransaction(count, completed, added);
    }

    remove(id, count = 1, beginSlot = -1, assureFullRemoval = false) {
        let hasCount = this.getItemCount(id);

        if (assureFullRemoval && hasCount < count) {
            return new InventoryTransaction(count, 0, []);
        } else if (!assureFullRemoval && hasCount < 1) {
            return new InventoryTransaction(count, 0, []);
        }

        let totalRemoved = 0;
        let removed = [];

        let skippedIndices = null;
        if (beginSlot != -1) {
            skippedIndices = [];

            for (let i = 0; i < beginSlot; i++) {
                skippedIndices.push(i);
            }
        }

        let index = 0;
        if (beginSlot != -1) {
            index = beginSlot;
        }

        for (let i = index; i < this.capacity; i++) {
            let curItem = this.items[i];
            if (!curItem || curItem.id != id) {
                continue;
            }

            let removeCount = Math.min(curItem.count, count - totalRemoved);
            totalRemoved += removeCount;

            curItem.count -= removeCount;
            if (curItem.count == 0) {
                let removedItem = this.items[i];
                this.items[i] = null;
                removed.push({ slot: i, item: removedItem });
            }

            if (totalRemoved >= count) {
                break;
            }
        }

        if (skippedIndices != null && totalRemoved < count) {
            for (let i = 0; i < skippedIndices.length; i++) {
                let curItem = this.items[i];
                if (!curItem || curItem.id != id) {
                    continue;
                }

                let removeCount = Math.min(curItem.count, count - totalRemoved);
                totalRemoved += removeCount;

                curItem.count -= removeCount;
                if (curItem.count == 0) {
                    let removedItem = this.items[i];
                    this.items[i] = null;
                    removed.push({ slot: i, item: removedItem });
                }

                if (totalRemoved >= count) {
                    break;
                }
            }
        }

        if (totalRemoved > 0) {
            this.update = true;
        }

        return new InventoryTransaction(count, totalRemoved, removed);
    }

    delete(slot) {
        this.items[slot] = null;
        this.update = true;
    }

    swap(from, to) {
        let temp = this.items[from];
        this.set(from, this.items[to]);
        this.set(to, temp);
    }

    shift() {
        this.items = this.items.sort((a, b) => (a === null) - (b === null) || +(a > b) || -(a < b));
        this.update = true;
    }

    get(slot) {
        return this.items[slot];
    }

    set(slot, item) {
        this.items[slot] = item;
        this.update = true;
    }

    transfer(to, item, fromSlot = -1, toSlot = -1, note = false, unnote = false) {
        if (item.count <= 0) {
            return null;
        }

        let count = Math.min(item.count, this.getItemCount(item.id));
        let copy = { id: item.id, count: count };

        let finalItem = copy;
        if (note) {
            let cert = ObjType.find(i => i.certlink == item.id);
            if (cert) {
                finalItem = { id: cert.id, count: count };
            }
        } else if (unnote) {
            let type = ObjType.get(item.id);
            if (type.certlink != -1) {
                finalItem = { id: type.certlink, count: count };
            }
        }

        let add = to.add(finalItem.id, finalItem.count, toSlot, false);
        if (add.completed == 0) {
            return null;
        }

        let remove = this.remove(item.id, add.completed, fromSlot, false);
        if (remove.completed == 0) {
            return null;
        }

        return remove;
    }
}
