const jwt = require("jsonwebtoken")

exports.generateToken = (payload, expried) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: expried})
}

exports.verify = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET)
}