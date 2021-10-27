const path = require('path');
const fs = require('fs');
const pdf = require('html-node');
const dayjs = require('dayjs');
const nodeHtmlToImage = require('node-html-to-image');

const template = fs.readFileSync(
  path.resolve(__dirname, '../../../static/templates/certificate/index.html'),
  'utf8',
);

module.exports = function (deps) {
  const { db } = deps;

  return {
    async getCourses(req, res) {
      try {
        const rows = await db.query('SELECT * FROM courses');

        res.status(200).json(rows.map(({ questions, ...rest }) => rest));

        // const name = 'Debashis Barman';
        //
        // const html = template;
        // // .replace('{{name}}', name)
        // // .replace('{{date}}', dayjs().format('DD MMM YYYY'));
        //
        // console.log(2);
        //
        // const r = await pdf.create(
        //   {
        //     html,
        //     data: {
        //       users: [],
        //     },
        //     path: './output.pdf',
        //     type: 'buffer', // "stream" || "buffer" || "" ("" defaults to pdf)
        //   },
        //   {
        //     format: 'A3',
        //     orientation: 'portrait',
        //     border: '10mm',
        //     type: 'stream',
        //   },
        // );
        //
        // r.pipe(res);
      } catch (e) {
        // console.log(e);
        res.status(500).end();
      }
    },
    async getCourseByID(req, res) {
      try {
        const { id } = req.params;

        const rows = await db.query('SELECT * FROM courses WHERE id = ?', [id]);

        if (rows.length) {
          const { questions, ...rest } = rows[0];

          res.status(200).json({
            questions: JSON.parse(questions),
            ...rest,
          });
        } else {
          res.status(404).end();
        }
      } catch (e) {
        res.status(500).end();
      }
    },
    async updateProfileScore(req, res) {
      try {
        const { id } = req.user;

        const { score } = req.body;

        await db.query(
          'UPDATE employee_profile SET profile_score = ? WHERE employee_id = ?',
          [score, id],
        );

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
    async getCertificate(req, res) {
      try {
        res.status(200).end();

        // const { id, name } = req.user;
        //
        // const name = 'Debashis Barman';
        //
        // const html = template
        //   .replace('{{name}}', name)
        //   .replace('{{date}}', dayjs().format('DD MMM YYYY'));
        //
        // console.log(2);
        //
        // pdf
        //   .create(html, { width: '50mm', height: '90mm' })
        //   // eslint-disable-next-line consistent-return
        //   .toStream((err, stream) => {
        //     console.log(err);
        //
        //     if (err) return res.end(err.stack);
        //     res.setHeader('Content-type', 'application/pdf');
        //     stream.pipe(res);
        //   });

        // const image = await nodeHtmlToImage({
        //   html: '<html><body><div>Check out what I just did! #cool</div></body></html>',
        // });
        // res.writeHead(200, { 'Content-Type': 'image/png' });
        // res.end(image, 'binary');
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
