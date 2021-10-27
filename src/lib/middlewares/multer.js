const aws = require('aws-sdk');
const bluebird = require('bluebird');
const multer = require('multer');
const multerS3 = require('multer-s3');

module.exports = function (deps) {
  const { config } = deps;

  aws.config.setPromisesDependency(bluebird);

  aws.config.update({
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey'),
    region: config.get('aws.region'),
  });

  const s3 = new aws.S3();

  const upload = multer({
    storage: multerS3({
      s3,
      bucket: config.get('aws.bucket'),
      key: (req, file, cb) => {
        console.log(req.user, file);

        cb(null, `${req.user.id}/${file.originalname}`);
      },
    }),
  });

  const handler = upload.single('file');

  return (req, res, next) => {
    handler(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        next();
      }
    });
  };
};
