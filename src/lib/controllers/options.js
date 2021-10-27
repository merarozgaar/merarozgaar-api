const { orderBy } = require('lodash');

module.exports = function (deps) {
  const { db } = deps;

  function getTypes(type, lang = 'ENGLISH', order_by = 'label') {
    console.log(type, lang);

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const rows = await db.query(
            'SELECT * FROM types WHERE type = ? AND language = ?',
            [type, lang],
          );

          resolve(
            orderBy(
              rows.map(({ id: value, label, language }) => ({
                label,
                value,
                language,
              })),
              order_by,
            ),
          );
        } catch (e) {
          reject(e);
        }
      })();
    });
  }

  return {
    async getCompanySizes(req, res) {
      try {
        const { lang } = req.query;

        const results = await getTypes('COMPANY_SIZE_TYPE', lang);

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getGenders(req, res) {
      try {
        const { lang } = req.query;

        const results = await getTypes('GENDER', lang, 'display_order');

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getIndustries(req, res) {
      try {
        const results = await getTypes(
          'INDUSTRY_TYPE',
          'BOTH',
          'display_order',
        );

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getJobTypes(req, res) {
      try {
        const { lang } = req.query;

        const results = await getTypes('JOB_TYPE', lang);

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getProfessions(req, res) {
      try {
        const results = await getTypes('PROFESSION', 'BOTH');

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getQualifications(req, res) {
      try {
        const { lang } = req.query;

        const results = await getTypes('EDUCATION', lang, 'display_order');

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getSalaryFrequency(req, res) {
      try {
        const { lang } = req.query;

        const results = await getTypes('SALARY_FREQUENCY', lang);

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getSkills(req, res) {
      try {
        const { lang } = req.query;

        const results = await getTypes('SKILL_TYPE', lang, 'display_order');

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
