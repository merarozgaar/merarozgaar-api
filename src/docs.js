const path = require('path');
const config = require('config');

module.exports = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Mera Rozgaar',
      description:
        'This is the API server for [Mera Rozgaar](https://merarozgaar.app) platform. Here, you can find all the API related information. Please feel free to contact the developer for any queries or issues.',
      version: config.get('apiEndpoint.version'),
      contact: {
        name: 'Gicbol',
        url: 'https://gicbol.com',
        email: 'contact@gicbol.com',
      },
    },
    schemes: ['http', 'https'],
    basePath: config.get('apiEndpoint.prefix'),
    tags: [
      {
        name: 'Applications',
        description: 'Endpoints for processing job applications.',
      },
      {
        name: 'Authentication',
        description: 'Endpoints for user registration and authentication.',
      },
      {
        name: 'Candidates',
        description: 'Endpoints for candidate profile and listing.',
      },
      {
        name: 'Courses',
        description: 'Endpoints for video courses, certification and badge.',
      },
      {
        name: 'Employee',
        description: 'Endpoints for employee profile and related applications.',
      },
      {
        name: 'Employer',
        description:
          'Endpoints for employer profile and related jobs postings.',
      },
      {
        name: 'Interviews',
        description: 'Endpoints related to job interviews.',
      },
      {
        name: 'Jobs',
        description: 'Endpoints for job postings across the platform.',
      },
      {
        name: 'Media',
        description: 'Endpoints related to media.',
      },
      {
        name: 'Notifications',
        description: 'Endpoints related to notifications.',
      },
      {
        name: 'Meta Data',
        description:
          'Endpoints related to various options used across the platform.',
      },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Authorization: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: [
    path.join(__dirname, './routes/*.js'),
    path.join(__dirname, './lib/controllers/*.js'),
  ],
};
