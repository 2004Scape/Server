import Linkable from '#/util/Linkable.js';

export default class DoublyLinkable extends Linkable {
    // constructor
    next2: DoublyLinkable | null = null;
    prev2: DoublyLinkable | null = null;

    unlink2(): void {
        if (this.prev2 !== null) {
            this.prev2.next2 = this.next2;
            if (this.next2) {
                this.next2.prev2 = this.prev2;
            }
            this.next2 = null;
            this.prev2 = null;
        }
    }
}
