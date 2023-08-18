const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { validateEmail, validateLength, validateUsername } = require("../helpers/validation")
const User = require("../models/User")
const mailer = require('../helpers/mailer')
const tokenHelpers = require('../helpers/token')

exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    password,
    bYear,
    bMonth,
    bDay,
  } = req.body

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "invalid email address",
    })
  }

  // check email
  const check = await User.findOne({ email }, { _id: 1 })
  if (check) {
    return res.status(400).json({
      message: "This email address already exists,try with a different email address",
    })
  }
  if (!validateLength(firstName, 3, 30)) {
    return res.status(400).json({
      message: "first name must between 3 and 30 characters.",
    })
  }
  if (!validateLength(lastName, 3, 30)) {
    return res.status(400).json({
      message: "last name must between 3 and 30 characters.",
    })
  }
  if (!validateLength(password, 6, 40)) {
    return res.status(400).json({
      message: "password must be atleast 6 characters.",
    })
  }

  const cryptedPassword = await bcrypt.hash(password, 12)
  let tempUsername = firstName + lastName
  const username = await validateUsername(tempUsername)
  console.log(cryptedPassword)
  const user = new User({
    firstName,
    lastName,
    username,
    email,
    gender,
    password: cryptedPassword,
    bYear,
    bMonth,
    bDay,
  })
  await user.save()
  const verifyToken = tokenHelpers.generateToken({id: user._id}, "30m")
  const verifyUrl = `${process.env.BASE_URL}/activate/${verifyToken}`
  const mailerInfo = await mailer.sendVerificationEmail(email, firstName + ' ' + lastName, verifyUrl)
  console.info('mailerInfo:', mailerInfo);
  res.status(200).send({})
}

exports.signin = async (req, res) => {
  const {email: email_or_username, password} = req.body

  const user = await User.findOne({$or: [{email: email_or_username}]})
  console.log(user);
  if(!user) {
    return res.status(300).json({
      message: "wrong email or password",
    })
  }

  const match = bcrypt.compareSync(password, user.password)
  console.log(match);

  if(!match) {
    return res.status(300).json({
      message: "wrong email or password.",
    })
  }
  const {
    _id,
    firstName,
    lastName,
    username,
    email
  } = user

  const jwtStr = jwt.sign({
    id: _id,
    username,
    email
  }, 'secret', {expiresIn: 60 * 60})

  return res.status(200).json({
    id: _id,
    firstName,
    lastName,
    username,
    email,
    token: jwtStr,
  })
}

exports.activate = async (req, res) => {
  const verifyToken = req.params.verifytoken
  const result = tokenHelpers.verify(verifyToken)
  console.log('verify token result', result)
  const user = await User.findOne({_id: result.id})
  user.verified = true
  await user.save()
  return res.status(200).json({
    message: "Account has been activated successfully"
  })
}