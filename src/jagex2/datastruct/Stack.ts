import Hashable from '#jagex2/datastruct/Hashable.js';

export default class Stack<T extends Hashable> {
    readonly sentinel: Hashable;
    private cursor: Hashable | null = null;

    constructor() {
        const head: Hashable = new Hashable();
        head.nextHashable = head;
        head.prevHashable = head;
        this.sentinel = head;
    }

    push(node: T): void {
        if (node.prevHashable) {
            node.uncache();
        }
        node.prevHashable = this.sentinel.prevHashable;
        node.nextHashable = this.sentinel;
        if (node.prevHashable) {
            node.prevHashable.nextHashable = node;
        }
        node.nextHashable.prevHashable = node;
    }

    pop(): T | null {
        const node: T | null = this.sentinel.nextHashable as T | null;
        if (node === this.sentinel) {
            return null;
        }
        node?.uncache();
        return node;
    }

    head(): T | null {
        const node: T | null = this.sentinel.nextHashable as T | null;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.nextHashable || null;
        return node;
    }

    next(): T | null {
        const node: T | null = this.cursor as T | null;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.nextHashable || null;
        return node;
    }

    clear(): void {
        while (true) {
            const node = this.sentinel.next;
            if (node == this.sentinel) {
                return;
            }
            if (node) {
                node.unlink();
            }
        }
    }
}
