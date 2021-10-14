const express = require('express')
var cors = require('cors')

const { socketController } = require('../sockets/controller')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)

    this.path = {}

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()

    // Sockets
    this.sockets()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Directory Public
    this.app.use(express.static('public'))
  }

  routes() {
    // this.app.use(this.path.auth, require('../routes/auth.routes'))
  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor funcionando en el puerto ${this.port}`)
    })
  }
}

module.exports = Server