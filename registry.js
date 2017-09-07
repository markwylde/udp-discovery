const {promisify} = require('util')
const path = require('path')
const fs = require('fs')
const udp = require('dgram')

const readFileAsync = promisify(fs.readFile)

const os = require('os')

const multicast_addr = '224.1.1.1'
const bin_addr = '0.0.0.0'
const port = 6811

module.exports = function Registry(opts) {
  const listener = udp.createSocket({type: 'udp4', reuseAddr: true})
  const sender = udp.createSocket({type: 'udp4', reuseAddr: true})

  listener.bind(port, multicast_addr, function (){
    listener.addMembership(multicast_addr)
    listener.setBroadcast(true)
    sendRegistryData()
  })

  listener.on('message', async function (b, other) {
    if (b.toString().trim() === 'SCAN') {
      sendRegistryData()
    }
  })

  function sendRegistryData() {
    const data = JSON.stringify([
      os.hostname(),
      opts.key,
      opts.value
    ])
    sender.send(data, 0, data.length, port, multicast_addr)
  }
}
