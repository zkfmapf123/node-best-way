import * as rq from 'amqplib/callback_api'

class MessageBroker {
  constructor() {
    this.setup()
  }

  private setup() {
    console.log('Setting up RabbigMQ...')

    try {
      rq.connect(`amqp://localhost`, (err, conn) => {
        conn.createChannel((err, chan) => {})
      })
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }

  sender<T>(channel: string, data: T) {
    try {
      rq.connect('amqp://localhost', (err, conn) => {
        // use logger
        if (err) throw new Error(err)

        conn.createChannel((err, chan) => {
          if (err) throw new Error(err)

          chan.assertQueue(channel, { durable: false })
          chan.sendToQueue(channel, Buffer.from(JSON.stringify(data)))
          console.log(`Message send ${channel}`)
          //   chan.consume(
          //     channel,
          //     (msg) => {
          //       console.log(`${channel} - ${msg?.content.toString()}`)
          //     },
          //     { noAck: true }
          //   )
          //   console.log(`Queue Name is - ${channel}`)
        })
      })
    } catch (e) {
      // use logger
      console.error(e)
    }
  }

  receive(channel: string) {
    try {
      rq.connect('amqp://localhost', (err, conn) => {
        // use logger
        if (err) throw new Error(err)

        conn.createChannel((err, chan) => {
          if (err) throw new Error(err)

          chan.assertQueue(channel, { durable: false })

          chan.consume(
            channel,
            (msg) => {
              console.log(`${channel} - ${msg?.content.toString()}`)
            },
            { noAck: true }
          )
        })

        console.log(`Message receive ${channel}`)
      })
    } catch (e) {
      // use logger
      console.error(e)
    }
  }
}

export const messageBroker = new MessageBroker()
