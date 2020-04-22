require('dotenv').config()

module.exports = {
  serviceKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  port: process.env.PORT || 3000,
};