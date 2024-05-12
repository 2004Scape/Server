import Hashable from '#jagex2/datastruct/Hashable.js';

export default class Stack {
    readonly head: Hashable;

    constructor() {
        this.head = new Hashable();
    }

    push(node: Hashable): void {
        if (node.prevHashable) {
            node.uncache();
        }
        node.prevHashable = this.head.prevHashable;
        node.nextHashable = this.head;
        if (node.prevHashable) {
            node.prevHashable.nextHashable = node;
        }
        node.nextHashable.prevHashable = node;
    }

    pop(): Hashable | null {
        const node: Hashable | null = this.head.nextHashable;
        if (node === this.head) {
            return null;
        } else {
            node?.uncache();
            return node;
        }
    }
}
