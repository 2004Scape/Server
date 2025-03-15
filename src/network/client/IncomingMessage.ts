import ClientProtCategory from '#/network/client/prot/ClientProtCategory.js';

export default abstract class IncomingMessage {
    abstract readonly category: ClientProtCategory;
}
