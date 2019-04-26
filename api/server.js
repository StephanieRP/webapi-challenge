
const express = require('express')
const helmet = require('helmet');
var cors = require('cors')

// import routers 
const projectsRouter = require("./project-router.js")
const actionsRouter = require("./actions-router.js")

const server = express();

server.use(express.json())
server.use(cors())
server.use(helmet());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res, next) => {
    res.send(`
      <h2>Running Server now...!</h2>
      `);
  });

module.exports = server;