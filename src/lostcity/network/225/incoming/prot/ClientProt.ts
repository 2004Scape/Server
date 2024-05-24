// same as server/ClientProt.ts except we're transitioning the network code, and keeping legacy code untouched
export default class ClientProt {
    static all: ClientProt[] = [];
    static byId: ClientProt[] = [];

    static readonly INV_BUTTON1 = new ClientProt(190, 31, 6); // NXT has "IF_BUTTON1" but for our interface system, this makes more sense
    static readonly INV_BUTTON2 = new ClientProt(191, 59, 6); // NXT has "IF_BUTTON2" but for our interface system, this makes more sense
    static readonly INV_BUTTON3 = new ClientProt(192, 212, 6); // NXT has "IF_BUTTON3" but for our interface system, this makes more sense
    static readonly INV_BUTTON4 = new ClientProt(193, 38, 6); // NXT has "IF_BUTTON4" but for our interface system, this makes more sense
    static readonly INV_BUTTON5 = new ClientProt(194, 6, 6); // NXT has "IF_BUTTON5" but for our interface system, this makes more sense

    // in these old revisions we can actually get the packet index from a leftover array in the client source
    constructor(readonly index: number, readonly id: number, readonly length: number) {
        ClientProt.all[index] = this;
        ClientProt.byId[id] = this;
    }
}
