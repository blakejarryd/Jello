const express = require('express')

const cardsRouter = express.Router()
const Card = require('../models/cards')

cardsRouter.get('/', async (req, res) => {
  const cards = await Card.find({}).exec()
  console.log(cards)
  res.status(200).json(cards)
})

module.exports = cardsRouter