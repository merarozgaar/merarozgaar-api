const axios = require('axios');

module.exports = function () {
  return {
    async getPlaceDetails(req, res) {
      try {
        const { data } = await axios.get(
          'https://maps.googleapis.com/maps/api/place/details/json',
          {
            params: {
              key: 'AIzaSyByChJ6eImvdtgXwqatrQmOJGOMlG6xo8o',
              place_id: req.query.place_id,
              fields: 'address_component,name,geometry,formatted_address',
              // language: { HINDI: 'hi', ENGLISH: 'en' }[appLanguage],
            },
            responseType: 'stream',
          },
        );

        data.pipe(res);
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
