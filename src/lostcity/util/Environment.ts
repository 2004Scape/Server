import 'dotenv/config';
import { tryParseArray, tryParseBoolean, tryParseInt, tryParseString } from './TryParse.js';

export default {
    /// web server
    WEB_PORT: tryParseInt(process.env.WEB_PORT, process.platform === 'win32' ? 80 : 8888),
    WEB_CORS: tryParseBoolean(process.env.WEB_CORS, true),

    /// game server
    // world id - offset by 9, so 1 = 10, 2 = 11, etc
    NODE_ID: tryParseInt(process.env.NODE_ID, 10),
    NODE_PORT: tryParseInt(process.env.NODE_PORT, 43594),
    // members content
    NODE_MEMBERS: tryParseBoolean(process.env.NODE_MEMBERS, true),
    // addxp multiplier
    NODE_XPRATE: tryParseInt(process.env.NODE_XPRATE, 1),
    // production mode!
    NODE_PRODUCTION: tryParseBoolean(process.env.NODE_PRODUCTION, false),
    // automatic shutdown time for production mode on sigint
    NODE_KILLTIMER: tryParseInt(process.env.NODE_KILLTIMER, 50),
    NODE_ALLOW_CHEATS: tryParseBoolean(process.env.NODE_ALLOW_CHEATS, true),
    // development mode!
    NODE_DEBUG: tryParseBoolean(process.env.NODE_DEBUG, true),
    // measuring script execution
    NODE_DEBUG_PROFILE: tryParseBoolean(process.env.NODE_DEBUG_PROFILE, false),
    // *only* if no login server is running to authenticate accounts, this provides admin accs by username :)
    NODE_STAFF: tryParseArray(process.env.NODE_STAFF?.split(','), ['pazaz']), // todo: add staffmodlevel to database
    // no server routefinding until 2009
    NODE_CLIENT_ROUTEFINDER: tryParseBoolean(process.env.NODE_CLIENT_ROUTEFINDER, true),
    // controllable for bot testing
    NODE_SOCKET_TIMEOUT: tryParseBoolean(process.env.NODE_SOCKET_TIMEOUT, true),

    /// login server
    LOGIN_HOST: tryParseString(process.env.LOGIN_HOST, 'localhost'),
    LOGIN_PORT: tryParseInt(process.env.LOGIN_PORT, 43500),
    LOGIN_KEY: tryParseString(process.env.LOGIN_KEY, ''),

    /// database
    DB_HOST: tryParseString(process.env.DB_HOST, 'localhost'),
    DB_USER: tryParseString(process.env.DB_USER, 'root'),
    DB_PASS: tryParseString(process.env.DB_PASS, 'password'),
    DB_NAME: tryParseString(process.env.DB_NAME, 'lostcity'),

    /// development
    // some users may not be able to change their system PATH for this project
    BUILD_JAVA_PATH: tryParseString(process.env.BUILD_JAVA_PATH, 'java'),
    // auto-build on startup
    BUILD_STARTUP: tryParseBoolean(process.env.BUILD_STARTUP, true),
    // auto-update compiler on startup
    BUILD_STARTUP_UPDATE: tryParseBoolean(process.env.BUILD_STARTUP_UPDATE, true),
    // used to check if we're producing the original cache without edits
    BUILD_VERIFY: tryParseBoolean(process.env.BUILD_VERIFY, true),
    // used to keep some semblance of sanity in our folder structure
    BUILD_VERIFY_FOLDER: tryParseBoolean(process.env.BUILD_VERIFY_FOLDER, true),
    // used for unpacking/custom development
    BUILD_VERIFY_PACK: tryParseBoolean(process.env.BUILD_VERIFY_PACK, true),
    // used for unpacking/custom development
    BUILD_SRC_DIR: tryParseString(process.env.BUILD_SRC_DIR, 'data/src'),
};
