const express = require('express')
const { logger, errorHandling } = require('./middleware/middleware')
const helmet = require('helmet')
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger)

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.use(errorHandling)

module.exports = server
