const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync()
  )

module.exports = userRouter