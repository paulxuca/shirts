const router = require('express').Router(); // eslint-disable-line new-cap
const AWS = require('aws-sdk');
const path = require('path');

AWS.config.loadFromPath('./s3config.json');
const s3Bucket = new AWS.S3({ params: { Bucket: 'shirts.qthreads' } });


router.post('/upload', (request, response) => {
  const buffer = new Buffer(
    request.body.imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64'
  );

  const data = {
    Key: request.body.fileName,
    ACL: 'public-read',
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };
  s3Bucket.putObject(data, (err, responseData) => {
    if (err) {
      console.log(err);
      response.status(400).end();
    } else {
      response.status(200).json({ responseData, url: `https://s3.amazonaws.com/shirts.qthreads/${request.body.fileName}` });
    }
  });
});

module.exports = router;
