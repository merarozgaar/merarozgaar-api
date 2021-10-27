const aws = require('aws-sdk');
const bluebird = require('bluebird');
const fs = require('fs');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');
const font2base64 = require('node-font2base64');
const dayjs = require('dayjs');
const { padStart } = require('lodash');
const url = require('url');

const template = fs.readFileSync(
  path.resolve(__dirname, '../../../static/templates/certificate/index.html'),
  'utf8',
);

module.exports = function (deps) {
  const { config, db } = deps;

  aws.config.setPromisesDependency(bluebird);

  aws.config.update({
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey'),
    region: config.get('aws.region'),
  });

  const s3 = new aws.S3();

  return {
    async upload(req, res) {
      try {
        // console.log(req.file);

        const { id } = req.user;

        const { context, data, file_name } = req.body;

        // eslint-disable-next-line new-cap
        const base64Data = new Buffer.from(
          data.replace(/^data:image\/\w+;base64,/, ''),
          'base64',
        );

        const type = data.split(';')[0].split('/')[1];

        const params = {
          Bucket: config.get('aws.bucket'),
          Key: `${id}/${file_name}`,
          Body: base64Data,
          ContentEncoding: 'base64', // required
          ContentType: type, // required
        };

        const { Location } = await s3.upload(params).promise();

        const rows = await db.query(
          'SELECT * FROM uploads WHERE user_id = ? AND context = ?',
          [id, context],
        );

        if (rows.length) {
          const { id: upload_id } = rows[0];

          await db.query('UPDATE uploads SET url = ? WHERE id = ?', [
            Location,
            upload_id,
          ]);

          res.status(201).json({ ...rows[0], url: Location });
        } else {
          const { insertId } = await db.query(
            'INSERT INTO uploads (context, url, user_id) VALUES (?, ?, ?)',
            [context, Location, id],
          );

          const [payload] = await db.query(
            'SELECT * FROM uploads WHERE id = ?',
            insertId,
          );

          res.status(201).json(payload);
        }
        // res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async uploadVideo(req, res) {
      res.status(200).end();
    },
    async getCertificate(req, res) {
      try {
        const { name, id } = req.user;

        const image = await nodeHtmlToImage({
          html: template
            .replace(
              /{{fontBoldStyle}}/g,
              font2base64.encodeToDataUrlSync(
                path.resolve(
                  __dirname,
                  '../../../static/templates/certificate/fonts/Aeonik-Bold.woff2',
                ),
              ),
            )
            .replace(
              /{{fontRegularStyle}}/g,
              font2base64.encodeToDataUrlSync(
                path.resolve(
                  __dirname,
                  '../../../static/templates/certificate/fonts/Aeonik-Regular.woff2',
                ),
              ),
            )
            .replace(/{{name}}/g, name)
            .replace(/{{date}}/g, dayjs().format('DD MMM YYYY'))
            .replace(
              /{{id}}/g,
              `MRCA${id < 1000 ? `${padStart(id.toString(), 4, '000')}` : id}`,
            ),
          puppeteerArgs: {
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-dev-shm-usage',
              '--disable-accelerated-2d-canvas',
              '--no-first-run',
              '--headless',
              '--no-zygote',
              '--disable-gpu',
            ],
            headless: true,
            ignoreHTTPSErrors: true,
          },
        });
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
  };
};
