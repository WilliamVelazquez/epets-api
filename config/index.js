require('dotenv').config()

module.exports = {
  serviceKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  serviceUrl: process.env.SERVICE_URL,
  port: process.env.PORT || 3000,
};