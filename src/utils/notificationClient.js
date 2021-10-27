const axios = require('axios');
const config = require('config');

const notificationClient = axios.create({
  baseURL: `https://fcm.googleapis.com/fcm/send`,
  headers: {
    Authorization: config.get('fcm.serverKey'),
  },
});

notificationClient.interceptors.response.use(
  (r) => r,
  (e) => {
    console.log(e);

    return Promise.reject(e);
  },
);

module.exports = notificationClient;
