require('dotenv').config();

// remove this once you confirm it works
console.log(`${process.env.JWT_SECRET}`);
// like, seriously. go delete that!

// const PORT = 3000;
const { PORT = 3000} = process.env
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use(bodyParser.json())

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});