import { Counter, Histogram } from 'prom-client';

export const trackLoginAttempts = new Counter({
    name: 'lostcity_login_attempts',
    help: 'Total login attempts.'
});

export const trackLoginTime = new Histogram({
    name: 'lostcity_login_time_ms',
    help: 'Login processing duration in milliseconds.',
    buckets: [100, 250, 500, 1000, 2500, 5000]
});
