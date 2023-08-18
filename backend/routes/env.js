const express = require('express')

const router = express.Router()

router.get('/env', (req, res) => {
  res.send(JSON.stringify(process.env))
})

module.exports = router