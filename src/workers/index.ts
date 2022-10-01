import childProcess, { ChildProcess } from 'child_process'

export enum WorkerType {
  CALCULATOR = 'calculator',
  BIG_WRITE = 'big_write',
}

type WorkerMap = Map<WorkerType, ChildProcess>
class Workers {
  private map: WorkerMap = new Map()
  private calculatorWorker: ChildProcess = childProcess.fork(`${__dirname}/calculator`)
  private bigWirteStringWorker: ChildProcess = childProcess.fork(`${__dirname}/bigWriter`)

  constructor() {
    this.map.set(WorkerType.CALCULATOR, this.calculatorWorker)
    this.map.set(WorkerType.BIG_WRITE, this.bigWirteStringWorker)
  }

  getChildProcess(): WorkerMap {
    return this.map
  }
}

export const workers = new Workers()
