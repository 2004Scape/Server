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
    PUBLIC_IP: tryParse(process.env.PUBLIC_IP) || 'localhost',
    WEB_PORT: tryParse(process.env.WEB_PORT) || 80,
    GAME_PORT: tryParse(process.env.GAME_PORT) || 43594,

    LOGIN_HOST: tryParse(process.env.LOGIN_HOST) || 'localhost',
    LOGIN_PORT: tryParse(process.env.LOGIN_PORT) || 43500,
    LOGIN_KEY: tryParse(process.env.LOGIN_KEY) || 'SuperSecretKey',

    FRIEND_HOST: tryParse(process.env.FRIEND_HOST) || 'localhost',
    FRIEND_PORT: tryParse(process.env.FRIEND_PORT) || 43501,
    FRIEND_KEY: tryParse(process.env.FRIEND_KEY) || 'SuperSecretKey2',

    LOCAL_DEV: tryParse(process.env.LOCAL_DEV),
    MEMBERS_WORLD: tryParse(process.env.MEMBERS_WORLD),
    XP_MULTIPLIER: tryParse(process.env.XP_MULTIPLIER) || 1,

    NODE_ID: tryParse(process.env.NODE_ID) || 1,

    HTTPS_CERT: tryParse(process.env.HTTPS_CERT),
    CLIRUNNER: tryParse(process.env.CLIRUNNER),
    CI_MODE: tryParse(process.env.CI_MODE),
};
