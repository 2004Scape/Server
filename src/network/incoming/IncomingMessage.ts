import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default abstract class IncomingMessage {
    readonly abstract category: ClientProtCategory;
}
