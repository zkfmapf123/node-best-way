import 'reflect-metadata'
import { IController } from '#bases/interfaces'
import { ExampleController } from '#controllers/example.c'
import express, { Router } from 'express'
import helmet from 'helmet'
import cluster from 'cluster'
import os from 'os'

class DkExpressApp {
  private app = express()

  constructor() {
    this._middleware()
    this._router([new ExampleController()])
  }

  private _middleware() {
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  /**
   * @desc
   * Router
   */
  private _router(controllers: IController[]) {
    const router = Router()

    // root
    router.get('/', (req, res) => res.send('Hello DK World'))
    controllers.forEach((c) => {
      const [prefix, _router] = c.initRoutes()
      router.use(prefix, _router)
    })
    this.app.use('/v1', router)
  }

  /**
   * @todo use worker
   */
  async start(port = 8000) {
    if (cluster.isMaster) {
      // const workerMap = workers.getChildProcess()
      // console.log(`Child Process Role : ${WorkerType.CALCULATOR} ID is ${workerMap.get(WorkerType.CALCULATOR)?.pid}`)
      // console.log(`Child Process Role : ${WorkerType.BIG_WRITE} ID is ${workerMap.get(WorkerType.BIG_WRITE)?.pid}`)

      // cluster -> messaging
      // for (const [_, v] of workerMap)
      //   v.on('message', (number) => console.log(`Fab bumber from child process ${number}`))

      // cluster -> online
      // cluster.on('online', (worker) => console.log(`Messaging received from - ${worker.process.pid}`))

      // cluster -> fork cpu lenght - child_process
      for (let i = 0; i < os.cpus().length; i++) cluster.fork()
    } else {
      this.app.listen(port, () => {}).on('error', () => process.exit(1))
      cluster.on('exit', () => cluster.fork())
    }
  }
}

const app = new DkExpressApp()
app.start()
