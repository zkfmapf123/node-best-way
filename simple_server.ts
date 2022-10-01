import express from 'express'

const recursive = (num: number): number => {
  if (num <= 1) {
    return 1
  }

  return num + recursive(num - 1)
}

const app = express()

app.get('/:number', async (req, res) => {
  res.send(`${recursive(parseInt(req.params.number, 10))}`)
})

app.listen(3000, () => {
  console.log('http://localhost:3000 recursive start')
})
