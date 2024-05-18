import {CronJob } from 'cron';

function fetchExpired() {
    console.log('its 10am!');
}

const job = new CronJob(
    '1 0 10 * * *',
    fetchExpired, null, true
);

console.log('scheduler is gosh darn started');