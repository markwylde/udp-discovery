const http = require('http')

const server  = http.createServer()
server.listen(0)

server.on('listening', function() {
  const port = server.address().port

  const Registry = require('./registry')
  const registry = new Registry({
    key: 'my-example-app',
    value: {
      name: 'Example App',
      description: 'This is an example app',
      port
    }
  })
})