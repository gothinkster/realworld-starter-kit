const config = require('../config')

const app = require('../app')

process.once('SIGINT', shutDown)
process.once('SIGTERM', shutDown) 


app.server.listen(config.server.port, config.server.host, null, serverStarted)

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

// let the user know on which host and port server got successfully started
function serverStarted () {
  console.log('Started the server on: http://' + config.server.host + ':' + config.server.port)
}
