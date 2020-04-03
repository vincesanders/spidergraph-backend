const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');
const graphsRouter = require('./graphs/graphsRouter');
server.use(helmet(), cors(), express.json());

server.use('/api/auth',authRouter);
server.use('/api/users',usersRouter);
server.use('/api/graphs',graphsRouter);

module.exports = server;