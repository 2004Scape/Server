import 'dotenv/config';
import { tryParseBoolean, tryParseInt, tryParseString } from './TryParse.js';

export default {
    PUBLIC_IP: tryParseString(process.env.PUBLIC_IP, ''),
    WEB_PORT: tryParseInt(process.env.WEB_PORT, 0),
    GAME_PORT: tryParseInt(process.env.GAME_PORT, 0),

    LOGIN_HOST: tryParseString(process.env.LOGIN_HOST, ''),
    LOGIN_PORT: tryParseInt(process.env.LOGIN_PORT, 0),
    LOGIN_KEY: tryParseString(process.env.LOGIN_KEY, ''),

    FRIEND_HOST: tryParseString(process.env.FRIEND_HOST, ''),
    FRIEND_PORT: tryParseInt(process.env.FRIEND_PORT, 0),
    FRIEND_KEY: tryParseString(process.env.FRIEND_KEY, ''),

    WORLD_ID: tryParseInt(process.env.WORLD_ID, 0),
    LOCAL_DEV: tryParseBoolean(process.env.LOCAL_DEV, false),
    MEMBERS_WORLD: tryParseBoolean(process.env.MEMBERS_WORLD, true),
    XP_MULTIPLIER: tryParseInt(process.env.XP_MULTIPLIER, 1),
    SHUTDOWN_TIMER: tryParseInt(process.env.SHUTDOWN_TIMER, 50),

    HTTPS_ENABLED: tryParseBoolean(process.env.HTTPS_ENABLED, false),
    ADDRESS_SHOWPORT: tryParseBoolean(process.env.ADDRESS_SHOWPORT, true),
    CLIRUNNER: tryParseBoolean(process.env.CLIRUNNER, false),
    CI_MODE: tryParseBoolean(process.env.CI_MODE, false),
    SKIP_CORS: tryParseBoolean(process.env.SKIP_CORS, false),

    DB_HOST: tryParseString(process.env.DB_HOST, ''),
    DB_USER: tryParseString(process.env.DB_USER, ''),
    DB_PASS: tryParseString(process.env.DB_PASS, ''),
    DB_NAME: tryParseString(process.env.DB_NAME, ''),

    ADMIN_IP: tryParseString(process.env.ADMIN_IP, '')
};
