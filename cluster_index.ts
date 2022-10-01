import express from 'express'
import cluster from 'cluster'
import os from 'os'
import wait from 'wait'

if (cluster.isMaster) {
  const cpuLen = os.cpus().length
  console.log(`Total Number of Cpus ${cpuLen}`)

  for (let i = 0; i < cpuLen; i++) {
    // console.log(`fork : ${os.cpus()}`)
    cluster.fork()
  }

  cluster.on('online', (worker) => {
    console.log(`online : Worker Id is ${worker.id} and PID is ${worker.process.pid}`)
  })

  cluster.on('exit', (worker) => {
    console.log(`offline : Worker Id is ${worker.id} and PID is ${worker.process.pid}`)
    cluster.fork()
  })
} else {
  // local의 cpu 수 만큼 child process 가 생성
  const app = express()

  app.get('/', async (req, res) => {
    const pid = cluster.worker?.process.pid
    for (let i = 0; i < 100000000; i++) {}

    res.send(`hello world ${pid}`)
  })

  app.listen(3000, () => {
    console.log(`http://localhost:3000 connect`)
  })
}
