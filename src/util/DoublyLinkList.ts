import DoublyLinkable from '#/util/DoublyLinkable.js';

export default class DoublyLinkList {
    readonly head: DoublyLinkable = new DoublyLinkable();

    constructor() {
        this.head.next2 = this.head;
        this.head.prev2 = this.head;
    }

    push(node: DoublyLinkable): void {
        if (node.prev2) {
            node.unlink2();
        }
        node.prev2 = this.head.prev2;
        node.next2 = this.head;
        if (node.prev2) {
            node.prev2.next2 = node;
        }
        node.next2.prev2 = node;
    }

    pop(): DoublyLinkable | null {
        const node: DoublyLinkable | null = this.head.next2;
        if (node === this.head) {
            return null;
        } else {
            node?.unlink2();
            return node;
        }
    }
}
