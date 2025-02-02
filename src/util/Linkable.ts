export default class Linkable {
    key: bigint;
    next: Linkable | null;
    prev: Linkable | null;

    constructor() {
        this.key = 0n;
        this.next = this;
        this.prev = this;
    }

    unlink(): void {
        if (!this.prev || !this.next) {
            return;
        }
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.next = null;
        this.prev = null;
    }
}
