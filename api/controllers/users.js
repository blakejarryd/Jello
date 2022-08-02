const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync()
  )

  const user = await User.create(req.body)
  req.session.currentUser = user
  res.status(200).json({
    msg: "You have successfully registered",
    authorised: true,
    // user contains the hashed password, so just sending id/username
    user: {
      id: user._id,
      username: user.username
    }
  })
 })
module.exports = userRouter