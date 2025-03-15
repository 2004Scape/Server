import { FriendServer } from '#/server/friend/FriendServer.js';

const server = new FriendServer();
await server.start();
