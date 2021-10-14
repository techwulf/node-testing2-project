const express = require('express');
const cors = require('cors');

const energiesRouter = require('./energies/energies-router');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/energies', energiesRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;
