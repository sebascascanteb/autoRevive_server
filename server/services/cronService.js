// services/cronService.js
const cron = require('node-cron');
const emailService = require('./emailService');

class CronService {
  schedule(cronTime, task) {
    cron.schedule(cronTime, task);
  }
}

const cronService = new CronService();

//minute - hour - day of month - month - day of week
cronService.schedule('0 0 * * *', () => {
  emailService.sendReservationReminders();
});

module.exports = cronService;
