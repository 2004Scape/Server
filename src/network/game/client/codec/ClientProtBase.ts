export default abstract class ClientProtBase {
    static all: ClientProtBase[] = [];
    static byId: ClientProtBase[] = [];

    // in these old revisions we can actually get the packet index from a leftover array in the client source
    constructor(
        readonly index: number,
        readonly id: number,
        readonly length: number
    ) {
        ClientProtBase.all[index] = this;
        ClientProtBase.byId[id] = this;
    }
}
