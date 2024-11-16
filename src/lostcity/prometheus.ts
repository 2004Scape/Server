import { Counter, Histogram } from 'prom-client';

export const cycleHistogram = new Histogram({
    name: 'scape_server_cycle_duration_milliseconds',
    help: 'Total server cycle duration in milliseconds.',
    buckets: [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 400, 450, 550, 600, 800, 1000]
});

export const cycleWorldHistogram = new Histogram({
    name: 'scape_server_world_cycle_duration_milliseconds',
    help: 'Server world process cycle duration in milliseconds.',
    buckets: [10, 20, 30, 40, 50, 100]
});

export const clientInCycleHistogram = new Histogram({
    name: 'scape_server_client_in_cycle_duration_milliseconds',
    help: 'Server client in process duration in milliseconds.',
    buckets: [10, 30, 50, 100, 200, 300, 400]
});

export const clientOutCycleHistogram = new Histogram({
    name: 'scape_server_client_out_cycle_duration_milliseconds',
    help: 'Server client out process duration in milliseconds.',
    buckets: [10, 30, 50, 100, 200, 300, 400]
});

export const npcCycleHistogram = new Histogram({
    name: 'scape_server_npc_cycle_duration_milliseconds',
    help: 'Server npc process duration in milliseconds.',
    buckets: [10, 20, 30, 40, 50, 100]
});

export const playerCycleHistogram = new Histogram({
    name: 'scape_server_player_cycle_duration_milliseconds',
    help: 'Server player process duration in milliseconds.',
    buckets: [10, 20, 30, 40, 50, 100]
});

export const zoneCycleHistogram = new Histogram({
    name: 'scape_server_zone_cycle_duration_milliseconds',
    help: 'Server zone process duration in milliseconds.',
    buckets: [10, 20, 30, 40, 50, 100]
});

export const loginCycleHistogram = new Histogram({
    name: 'scape_server_login_cycle_duration_milliseconds',
    help: 'Server login process duration in milliseconds.',
    buckets: [10, 30, 50, 100]
});

export const logoutCycleHistogram = new Histogram({
    name: 'scape_server_logout_cycle_duration_milliseconds',
    help: 'Server logout process duration in milliseconds.',
    buckets: [10, 30, 50, 100]
});

export const bandwithInCounter = new Counter({
    name: 'scape_server_bandwidth_in_bytes',
    help: 'The server total bandwidth in in bytes.',
});

export const bandwithOutCounter = new Counter({
    name: 'scape_server_bandwidth_out_bytes',
    help: 'The server total bandwidth out in bytes.',
});