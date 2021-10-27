module.exports = {
  path: '/admin',
  role: 'ADMIN',
  routes: [
    {
      path: 'employers',
      method: 'get',
      handler: 'getEmployers',
    },
    {
      path: 'employees',
      method: 'get',
      handler: 'getEmployees',
    },
    {
      path: 'jobs',
      method: 'get',
      handler: 'getJobs',
    },
    {
      path: 'jobs/:id/approve',
      method: 'put',
      handler: 'approveJob',
    },
    {
      path: 'interviews',
      method: 'get',
      handler: 'getInterviews',
    },
    {
      path: 'notifications',
      method: 'get',
      handler: 'getNotifications',
    },
  ],
};
