const config = require('../config')

const app = require('../app')

process.once('SIGINT', shutDown)
process.once('SIGTERM', shutDown) 


app.server.listen(config.server.port, config.server.host, null, status)

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

// let the user know if starting the server failed
function status(error) {
  if(error) {
    console.log('There was an error starting the server', error)
  }
  console.log('Starting the server on: ' + config.server.host + ':' + config.server.port)
}
