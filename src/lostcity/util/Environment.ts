import 'dotenv/config';

function tryParse(value?: string) {
    if (typeof value === 'undefined') {
        return null;
    }

    // try parse as int
    const intValue = parseInt(value);
    if (!isNaN(intValue)) {
        return intValue;
    }

    // try parse as float
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
        return floatValue;
    }

    // try parse as boolean
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }

    // return as string
    return value;
}

export default {
    PUBLIC_IP: tryParse(process.env.PUBLIC_IP) ?? '',
    WEB_PORT: tryParse(process.env.WEB_PORT) ?? 0,
    GAME_PORT: tryParse(process.env.GAME_PORT) ?? 0,

    LOGIN_HOST: tryParse(process.env.LOGIN_HOST) ?? '',
    LOGIN_PORT: tryParse(process.env.LOGIN_PORT) ?? 0,
    LOGIN_KEY: tryParse(process.env.LOGIN_KEY) ?? '',

    FRIEND_HOST: tryParse(process.env.FRIEND_HOST) ?? '',
    FRIEND_PORT: tryParse(process.env.FRIEND_PORT) ?? 0,
    FRIEND_KEY: tryParse(process.env.FRIEND_KEY) ?? '',

    WORLD_ID: tryParse(process.env.WORLD_ID) ?? 0,
    LOCAL_DEV: tryParse(process.env.LOCAL_DEV) ?? false,
    MEMBERS_WORLD: tryParse(process.env.MEMBERS_WORLD) ?? true,
    XP_MULTIPLIER: tryParse(process.env.XP_MULTIPLIER) ?? 1,
    SHUTDOWN_TIMER: tryParse(process.env.SHUTDOWN_TIMER) ?? 50,

    HTTPS_CERT: tryParse(process.env.HTTPS_CERT) ?? '',
    CLIRUNNER: tryParse(process.env.CLIRUNNER) ?? false,
    CI_MODE: tryParse(process.env.CI_MODE) ?? false,
};
