// services/emailService.js
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sebascascanteb03@gmail.com',
        pass: 'fwcr pzww qizj yqin'
      }
    });
  }

  async sendEmail(message) {
    try {
      await this.transporter.sendMail(message);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendReservationReminders() {
    try {
      const now = new Date();
      const tomorrowStart = new Date(now);


      if (tomorrowStart.getHours() > 12) {
        tomorrowStart.setUTCDate(now.getUTCDate());
    }else{
        tomorrowStart.setUTCDate(now.getUTCDate()+1);
    }

      tomorrowStart.setUTCHours(0, 0, 0, 0);


      console.log(tomorrowStart);


      const tomorrowEnd = new Date(tomorrowStart);
      tomorrowEnd.setUTCDate(tomorrowStart.getUTCDate() + 1);
      console.log(tomorrowEnd);

      const reservations = await prisma.reservation.findMany({
        where: {
          date: {
            gte: tomorrowStart,
            lt: tomorrowEnd
          }
        },
        include: {
          client: true,
          service: true,
          branch: true,
          status: true
        }
      });

      for (const reservation of reservations) {
        const message = {
            from: 'AutoRevive <sebascascanteb03@gmail.com>',
            to: reservation.client.email,
            subject: 'Appointment Reminder',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                  <div style="text-align: center;">
                    <img src="https://i.imgur.com/HB2l7Qk.png" alt="Logo" style="max-width: 100px; margin-bottom: 20px;">
                  </div>
                  <h2 style="color: #333;">Hello ${reservation.client.name},</h2>
                  <p>This is a reminder of your appointment for <strong>${reservation.service.name}</strong> at <strong>${reservation.branch.name}</strong> on <strong><br>${reservation.date.toLocaleDateString()}</strong> at <strong>${reservation.startTime.toLocaleTimeString()}</strong>.</p>
                  <div style="text-align: center; margin: 20px 0;">
                    <a href="https://your-confirmation-url.com/confirm?reservationId=${reservation.id}" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Appointment</a>
                  </div>
                  <p>Thank you,<br>AutoRevive Team</p>
                </div>
              `
        };
    
        await this.sendEmail(message);

    }

      console.log('all notifications sent');

    } catch (error) {
      console.error('Error fetching reservations or sending emails:', error);
    }
  }
}

module.exports = new EmailService();
