const axios = require('axios');
const config = require('config');

const agoraClient = axios.create({
  baseURL: `https://api.agora.io/v1/apps/${config.get('agora.appId')}`,
  auth: {
    username: config.get('agora.apiKey'),
    password: config.get('agora.apiSecret'),
  },
});

module.exports = agoraClient;
