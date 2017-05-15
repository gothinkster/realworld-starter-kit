const config = require('../config')

const app = require('../app')

process.once('SIGINT', shutDown)
process.once('SIGTERM', shutDown) 

console.log('Starting the server on: http(s)://', config.server.host, ': ', config.server.port)
app.server.listen(config.server.port, config.server.host)

function shutDown () {
  console.log('Shutdown')
  if (app.server.listening) {
    app.server.shutdown(error => {
      if (error) {
        console.error(error)
      }
      app.db.destroy().catch(console.error)
    })
  }
}
