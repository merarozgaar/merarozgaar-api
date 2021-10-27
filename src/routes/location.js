module.exports = {
  path: '/location',
  middlewares: [],
  routes: [
    {
      path: '',
      method: 'get',
      handler: 'getPlaceDetails',
    },
  ],
};
