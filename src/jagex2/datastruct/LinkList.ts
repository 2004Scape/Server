import Linkable from './Linkable.js';

export default class LinkList {
    // constructor
    private readonly sentinel: Linkable;

    // runtime
    private cursor: Linkable | null = null;

    constructor() {
        const head: Linkable = new Linkable();
        head.next = head;
        head.prev = head;
        this.sentinel = head;
    }

    addTail = (node: Linkable): void => {
        if (node.prev) {
            node.unlink();
        }
        node.prev = this.sentinel.prev;
        node.next = this.sentinel;
        if (node.prev) {
            node.prev.next = node;
        }
        node.next.prev = node;
    };

    addHead = (node: Linkable): void => {
        if (node.prev) {
            node.unlink();
        }
        node.prev = this.sentinel;
        node.next = this.sentinel.next;
        node.prev.next = node;
        if (node.next) {
            node.next.prev = node;
        }
    };

    removeHead = (): Linkable | null => {
        const node: Linkable | null = this.sentinel.next;
        if (node === this.sentinel) {
            return null;
        }
        node?.unlink();
        return node;
    };

    head = (): Linkable | null => {
        const node: Linkable | null = this.sentinel.next;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.next || null;
        return node;
    };

    tail = (): Linkable | null => {
        const node: Linkable | null = this.sentinel.prev;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.prev || null;
        return node;
    };

    next = (): Linkable | null => {
        const node: Linkable | null = this.cursor;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.next || null;
        return node;
    };

    prev = (): Linkable | null => {
        const node: Linkable | null = this.cursor;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.prev || null;
        return node;
    };

    clear = (): void => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const node: Linkable | null = this.sentinel.next;
            if (node === this.sentinel) {
                return;
            }
            node?.unlink();
        }
    };
}
