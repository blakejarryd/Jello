const express = require('express')

const boardsRouter = express.Router()
const Board = require('../models/boards')

boardsRouter.get('/', async (req, res) => {
  const boards = await Board.find({}).exec()
  res.status(200).json(boards)
})


boardsRouter.get('/:boardID', async (req, res) => {
  const board = await Board.findById(req.params.boardID).exec()
  res.status(200).json(board)
})

boardsRouter.post('/', async (req, res) => {
  try{  
    const newBoard = await Board.create(req.body)
    res.status(200).json(newBoard)
  } catch (err) {
    // This may error log during dev, delete at deployment
    console.log(err)
    console.log('OOPS')
  }
})

boardsRouter.put('/:boardID', async (req, res) => {
  const updatedBoard = await Board.findByIdAndUpdate(req.params.boardID, req.body, { new: true }).exec()
  res.status(200).json(updatedBoard)
})

boardsRouter.delete('/:boardID', async (req, res) => {
  const deleteBoard = await Board.findByIdAndRemove(req.params.boardID).exec()
  res.status(200).json(deleteBoard)

})

module.exports = boardsRouter