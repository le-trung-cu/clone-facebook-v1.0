const express = require('express')
const User = require('../models/User')
const UserController = require('../controllers/user')

const router = express.Router()

router.get('/users', (req, res) => {
  res.send('user')
})

router.post('/users', UserController.register)
router.post('/users/signin', UserController.signin)
router.get('/activate/:verifytoken', UserController.activate)

module.exports = router