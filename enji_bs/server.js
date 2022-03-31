/* eslint-disable no-undef */
const fs = require('fs');
const http = require('http');
const https = require('https');
logger = require('./middleware/logger.js');
const privateKey = fs.readFileSync('./cert/key.pem', 'utf8');
const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const env = require('./environments');

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const {
  HTTP_PORT,
  HTTPS_PORT,
  GREETING_MESSAGE,
} = env.getEnvironmentVariables();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use(require('morgan')('combined', { stream: logger.stream }));

app.use('/api', require('./routes/api'));

// your express configuration here
app.get('*', function (req, res) {
  res.send(`${GREETING_MESSAGE}`);
  console.log(`${GREETING_MESSAGE}`);
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(HTTP_PORT, function () {
  console.log(
    'app is listening on port ' +
      HTTP_PORT +
      ' Go to http://localhost:' +
      HTTP_PORT
  );
});
httpsServer.listen(HTTPS_PORT, function () {
  console.log(
    'app is listening on port ' +
      HTTPS_PORT +
      ' Go to https://localhost:' +
      HTTPS_PORT
  );
});
