import { Request, Response, Router } from 'express'
import { IController } from '#bases/interfaces'
import { Controller } from '#decorators/class'
import { workers, WorkerType } from '#workers'
import { messageBroker } from '#utils/message.broker'

enum ExampleParams {
  EXAMPLE = '/ex',
  GET = '/get/:data',
  SET = '/set',
}

// @Controller(ExampleParams.EXAMPLE)
export class ExampleController implements IController {
  _prefix: string = ExampleParams.EXAMPLE

  initRoutes(): [string, Router] {
    const router = Router()
    router.get(ExampleParams.GET, this.getEx)
    router.get(ExampleParams.SET, this.setEx)
    return [ExampleParams.EXAMPLE, router]
  }

  /**
   * @desc
   * use child_process
   */
  // async getEx(req: Request, res: Response) {
  //   const data = req.params.data

  //   const workerMaps = workers.getChildProcess()
  //   workerMaps.get(WorkerType.CALCULATOR)?.send(data)
  //   workerMaps.get(WorkerType.BIG_WRITE)?.send(data)
  //   res.send('leedonggyu')
  // }

  /**
   * @desc
   * use RabbitMQ (messaging Queue)
   */
  async getEx(req: Request, res: Response) {
    const data = req.params.data

    messageBroker.sender('calculator', data)
    messageBroker.sender('bigWriter', data)
    res.send('leedonggyu')
  }

  async setEx(req: Request, res: Response) {}
}
