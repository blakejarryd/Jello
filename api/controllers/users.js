const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {

  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync()
  )

try {
  const user = await User.create({ username: req.body.username, password: req.body.password })
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
} catch (e) {
  console.log("Error")
  res.status(400).json({
    msg: "Username already exists"
  })
}
})

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username: username }).exec()

  if (!user) {
    return res.status(400).json({
      msg: "Username or password is incorrect"
    })
  }

  const passwordIsCorrect = bcrypt.compareSync(password, user.password)

  if (!passwordIsCorrect) {
    return res.status(400).json({
      msg: "Username or password is incorrect"
    })
  } else {
    req.session.currentUser = user
    res.status(200).json({
      msg: "You have logged in successfully",
      authorised: true
    })
  }
})

userRouter.post('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      msg: "User logged out"
    })
  })
})

userRouter.get("/isauthorised", async (req, res) => {
  if (req.session.currentUser) {
    return res.status(200).json({
      msg: "User is logged in",
      authorised: true
    })
  } else {
    return res.status(200).json({
      msg: "User is logged out",
      authorised: false
    })
  }
})

module.exports = userRouter