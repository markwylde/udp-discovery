const udp = require('dgram')

const multicast_addr = '224.1.1.1'
const bin_addr = '0.0.0.0'
const port = 6811

const listener = udp.createSocket({type: 'udp4', reuseAddr: true})
const sender = udp.createSocket({type: 'udp4', reuseAddr: true})

listener.bind(port, multicast_addr, function (){
  listener.addMembership(multicast_addr)
  listener.setBroadcast(true)
})

listener.on('message', async function (b, other) {
  if (b.toString().trim() !== 'SCAN') {
    console.log(b.toString().trim())
  }
})

sender.send('SCAN', 0, 'SCAN'.length, port, multicast_addr)