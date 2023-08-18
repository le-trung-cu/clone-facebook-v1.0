const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const compression = require('compression')
const fs = require('fs')
const mongoose = require('mongoose')

dotenv.config()
mongoose.connect('mongodb://127.0.0.1:27017/test').then(
  value => {
    console.log('connected to mongodb');
  }).catch(f => {
    console.log('sasas');
  })
const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())

fs.readdirSync('routes').map(filename => {
  console.log(filename)
  const router = require(`./routes/${filename}`)
  app.use(router)
})


app.get('/', (req, res) => {
  res.send('abc.')
})

app.listen(process.env.PORT || 5000, () => {
  console.log('server is lestining...')
})