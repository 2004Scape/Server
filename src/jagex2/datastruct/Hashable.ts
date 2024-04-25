import Linkable from './Linkable.js';

export default class Hashable extends Linkable {
    nextHashable: Hashable | null;
    prevHashable: Hashable | null;

    constructor() {
        super();
        this.nextHashable = this;
        this.prevHashable = this;
    }

    uncache(): void {
        if (!this.prevHashable || !this.nextHashable) {
            return;
        }
        this.prevHashable.nextHashable = this.nextHashable;
        this.nextHashable.prevHashable = this.prevHashable;
        this.nextHashable = null;
        this.prevHashable = null;
    }
}
