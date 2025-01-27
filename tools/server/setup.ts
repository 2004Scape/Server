import child_process from 'child_process';
import fs from 'fs';

import { confirm, input, number, password, select } from '@inquirer/prompts';

// ----

function setWebPort(port: number) {
    fs.appendFileSync('.env', `WEB_PORT=${port}\n`);
}

function setNodeId(id: number) {
    fs.appendFileSync('.env', `NODE_ID=${id + 9}\n`);
}

function setNodePort(port: number) {
    fs.appendFileSync('.env', `NODE_PORT=${port}\n`);
}

function setNodeMembers(state: boolean) {
    fs.appendFileSync('.env', `NODE_MEMBERS=${state}\n`);
}

function setNodeXpRate(rate: number) {
    fs.appendFileSync('.env', `NODE_XPRATE=${rate}\n`);
}

function setNodeProduction(state: boolean) {
    fs.appendFileSync('.env', `NODE_PRODUCTION=${state}\n`);
    fs.appendFileSync('.env', `NODE_DEBUG=${!state}\n`);
    fs.appendFileSync('.env', `NODE_ALLOW_CHEATS=${!state}\n`);
}

function setNodeKillTimer(timer: number) {
    fs.appendFileSync('.env', `NODE_KILLTIMER=${timer}\n`);
}

function setLoginServer(state: boolean, host?: string, port?: number) {
    if (host && port) {
        fs.appendFileSync('.env', `LOGIN_SERVER=${state}\nLOGIN_HOST=${host}\nLOGIN_PORT=${port}\n`);
    } else {
        fs.appendFileSync('.env', `LOGIN_SERVER=${state}\n`);
    }
}

function setFriendServer(state: boolean, host?: string, port?: number) {
    if (host && port) {
        fs.appendFileSync('.env', `FRIEND_SERVER=${state}\nFRIEND_HOST=${host}\nFRIEND_PORT=${port}\n`);
    } else {
        fs.appendFileSync('.env', `FRIEND_SERVER=${state}\n`);
    }
}

function setLoggerServer(state: boolean, host?: string, port?: number) {
    if (host && port) {
        fs.appendFileSync('.env', `LOGGER_SERVER=${state}\nLOGGER_HOST=${host}\nLOGGER_PORT=${port}\n`);
    } else {
        fs.appendFileSync('.env', `LOGGER_SERVER=${state}\n`);
    }
}

function setDatabase(host: string, port: number, name: string, user: string, pass: string) {
    fs.appendFileSync('.env', `DATABASE_URL=mysql://${user}:${pass}@${host}:${port}/${name}\n`);
    fs.appendFileSync('.env', `DB_HOST=${host}\nDB_PORT=${port}\nDB_NAME=${name}\nDB_USER=${user}\nDB_PASS=${pass}\n`);
}

// ----

async function promptWebPort() {
    const port = await number({
        message: 'Set http port',
        default: 80,
        required: true
    });

    setWebPort(port!);
}

async function promptNodeId() {
    const id = await number({
        message: 'Set world ID',
        default: 1,
        required: true
    });

    setNodeId(id!);
}

async function promptNodePort() {
    const port = await number({
        message: 'Set world port',
        default: 43594,
        required: true
    });

    setNodePort(port!);
}

async function promptNodeMembers() {
    const choice = await confirm({
        message: 'Enable members content',
        default: true
    });

    setNodeMembers(choice);
}

async function promptNodeXpRate() {
    const rate = await number({
        message: 'Set world XP rate',
        default: 1,
        required: true
    });

    setNodeXpRate(rate!);
}

async function promptNodeProduction() {
    const choice = await confirm({
        message: 'Enable production mode',
        default: false
    });

    setNodeProduction(choice);
}

async function promptNodeKillTimer() {
    const rate = await number({
        message: 'Set default reboot timer',
        default: 50,
        required: true
    });

    setNodeKillTimer(rate!);
}

async function promptLogin() {
    const choice = await confirm({
        message: 'Do you want to use a login server to provide authentication?',
        default: true
    });

    if (choice) {
        const host = await input({
            message: 'Host address',
            default: 'localhost'
        });

        const port = await number({
            message: 'Host port',
            default: 43500,
            required: true
        });

        setLoginServer(true, host, port!);
    } else {
        setLoginServer(false);
    }
}

async function promptFriend() {
    const choice = await confirm({
        message: 'Do you want to use a friend server to allow PMing?',
        default: true
    });

    if (choice) {
        const host = await input({
            message: 'Host address',
            default: 'localhost'
        });

        const port = await number({
            message: 'Host port',
            default: 45099,
            required: true
        });

        setFriendServer(true, host, port!);
    } else {
        setFriendServer(false);
    }
}

async function promptLogger() {
    const choice = await confirm({
        message: 'Do you want to use a logger server to log player sessions?',
        default: true
    });

    if (choice) {
        const host = await input({
            message: 'Host address',
            default: 'localhost'
        });

        const port = await number({
            message: 'Host port',
            default: 43501,
            required: true
        });

        setLoggerServer(true, host, port!);
    } else {
        setLoggerServer(false);
    }
}

async function promptDatabase() {
    const host = await input({
        message: 'Database host address',
        default: 'localhost'
    });

    const port = await number({
        message: 'Database host port',
        default: 3306,
        required: true
    });

    const name = await input({
        message: 'Database name',
        default: 'lostcity'
    });

    const user = await input({
        message: 'Database user account',
        default: 'lostcity'
    });

    const pass = await password({
        message: 'Database user password'
    });

    setDatabase(host, port!, name, user, pass);
}

async function promptWebsiteRegistration() {
    const autoregister = await confirm({
        message: 'Do you want to automatically register accounts when they attempt to log in?',
        default: true
    });

    fs.appendFileSync('.env', `WEBSITE_REGISTRATION=${!autoregister}\n`);
}

// ----

async function startup() {
    while (true) {
        const choices = [];

        if (fs.existsSync('data/pack')) {
            // quickstart script should run this before starting the server. exits and continues starting the world
            choices.push({
                name: 'Continue startup',
                value: 'continue'
            });
        }

        choices.push({
            name: 'Set up as a development world',
            value: 'configure-dev'
        });

        choices.push({
            name: 'Set up as a single world',
            value: 'configure-local'
        });

        choices.push({
            name: 'Set up as part of a multi-world infrastructure',
            value: 'configure-prod'
        });

        choices.push({
            name: 'Advanced options',
            value: 'advanced'
        });

        const action = await select({
            message: 'What would you like to do?',
            choices
        });

        switch (action) {
            case 'continue': {
                process.exit(0);
                break;
            }
            case 'configure-dev': {
                await configureDev();
                break;
            }
            case 'configure-local': {
                await configureSingle();
                break;
            }
            case 'configure-prod': {
                await configureMulti();
                break;
            }
            case 'advanced': {
                await advancedOptions();
                break;
            }
        }
    }
}

async function configureDev() {
    // we don't actually have to do anything because it's good OOTB :)
    fs.copyFileSync('.env.example', '.env');
    process.exit(0);
}

async function configureSingle() {
    fs.copyFileSync('.env.example', '.env');
    fs.appendFileSync('.env', '\n## SETUP SCRIPT\n');

    setNodeProduction(true);

    await promptNodeId();
    await promptNodeXpRate();
    await promptNodeMembers();
    fs.appendFileSync('.env', 'DB_BACKEND=sqlite\n');
    await promptWebsiteRegistration();

    setLoginServer(true, 'localhost', 43500);
    setFriendServer(true, 'localhost', 45099);
    setLoggerServer(true, 'localhost', 43501);

    fs.appendFileSync('.env', 'EASY_STARTUP=true\n');
    child_process.execSync('npm run sqlite:migrate', {
        stdio: 'inherit'
    });
    process.exit(0);
}

async function configureMulti() {
    fs.copyFileSync('.env.example', '.env');
    fs.appendFileSync('.env', '\n## SETUP SCRIPT\n');

    setNodeProduction(true);

    await promptNodeId();
    await promptNodeXpRate();
    await promptNodeMembers();
    await promptDatabase();
    await promptLogin();
    await promptWebsiteRegistration();
    await promptFriend();
    await promptLogger();

    child_process.execSync('npm run db:migrate', {
        stdio: 'inherit'
    });
    process.exit(0);
}

async function advancedOptions() {
    const advanced = await select({
        message: 'Advanced options',
        pageSize: 24,
        choices: [
            {
                name: 'Go back',
                value: 'back'
            },
            {
                name: 'Set http port',
                value: 'web_port'
            },
            {
                name: 'Set world ID',
                value: 'node_id'
            },
            {
                name: 'Set world port',
                value: 'node_port'
            },
            {
                name: 'Disable members content',
                value: 'node_members'
            },
            {
                name: 'Set world XP rate',
                value: 'node_xprate'
            },
            {
                name: 'Enable production mode',
                value: 'node_production'
            },
            {
                name: 'Set default reboot timer',
                value: 'node_killtimer'
            },
            {
                name: 'Configure login server',
                value: 'login'
            },
            {
                name: 'Configure friend server',
                value: 'friend'
            },
            {
                name: 'Configure logger server',
                value: 'logger'
            },
            {
                name: 'Configure database connection',
                value: 'database'
            }
        ]
    });

    switch (advanced) {
        case 'web_port': {
            await promptWebPort();
            break;
        }
        case 'node_id': {
            await promptNodeId();
            break;
        }
        case 'node_port': {
            await promptNodePort();
            break;
        }
        case 'node_members': {
            await promptNodeMembers();
            break;
        }
        case 'node_xprate': {
            await promptNodeXpRate();
            break;
        }
        case 'node_production': {
            await promptNodeProduction();
            break;
        }
        case 'node_killtimer': {
            await promptNodeKillTimer();
            break;
        }
        case 'login': {
            await promptLogin();
            break;
        }
        case 'friend': {
            await promptFriend();
            break;
        }
        case 'logger': {
            await promptLogger();
            break;
        }
        case 'database': {
            await promptDatabase();
            break;
        }
    }
}

try {
    await startup();
} catch (err) {
    // no-op
}
