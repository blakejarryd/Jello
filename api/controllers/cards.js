const express = require('express')

const cardsRouter = express.Router()
const Card = require('../models/cards')

cardsRouter.get('/', async (req, res) => {
  const cards = await Card.find({}).exec()
  // delete after testing
  res.status(200).json(cards)
})

cardsRouter.get('/:cardID', async (req, res) => {
  const card = await Card.findById(req.params.cardID).exec()
  res.status(200).json(card)
})

cardsRouter.post('/', async (req, res) => {
  try{  
    const newCard = await Card.create(req.body)
    res.status(200).json(newCard)
  } catch (err) {
    // This may error log during dev, delete at deployment
    console.log('OOPS')
  }
})

cardsRouter.put('/:cardID', async (req, res) => {
  const updatedCard = await Card.findByIdAndUpdate(req.params.cardID, req.body, { new: true }).exec()
  res.status(200).json(updatedCard)
})

//update many cards
cardsRouter.put('/', async (req, res) => {
  try {
    const updatedCard = await Card.updateMany({_id: {$in: req.body.cards }}, {$set: {"status": req.body.status}}, { new: true }).exec()
    res.status(200).json(updatedCard)
  } catch (err) {
    console.log(err)
  }
})

cardsRouter.delete('/:cardID', async (req, res) => {
  const deleteCard = await Card.findByIdAndRemove(req.params.cardID).exec()
  res.status(200).json(deleteCard)

})

module.exports = cardsRouter
