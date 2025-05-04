import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';

export default abstract class IncomingMessage {
    abstract readonly category: ClientProtCategory;
}
