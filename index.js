const express = require('express');
const bodyParser = require('body-parser');
const initiateMongoServer = require("./config/db");
const router = require('./routes');

const app = express();
// init mongo server
initiateMongoServer();

const port = 8000;

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
