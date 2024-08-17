const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendVerificationCode(phoneNumber) {
  return client.verify.services(process.env.TWILIO_SERVICE_ID)
    .verifications
    .create({ to: phoneNumber, channel: 'sms' });
}

async function verifyCode(phoneNumber, code) {
  return client.verify.services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks
    .create({ to: phoneNumber, code });
}

module.exports = { sendVerificationCode, verifyCode };
