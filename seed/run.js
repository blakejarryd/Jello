require("dotenv").config({path:__dirname+'/../.env'})

const mongoose = require('mongoose')

const Board = require('../models/boards')
const Card = require('../models/cards')
const User = require('../models/users')
const boardData = require('../seed/boardData.json')
const cardData = require('../seed/cardData.json')
const userData = require('../seed/userData.json')

const dbURL = process.env.MONGODB_URL
console.log(dbURL)

mongoose.connect(dbURL, async () => {
  console.log('Connected to Jello db')

  console.log('Resetting Cards collection')
  await Card.collection.drop()
  console.log('Cards collection dropped')
  
  console.log('Resetting Boards collection')
  await Board.collection.drop()
  console.log('Boards collection dropped')

  console.log('Resetting Users collection')
  await User.collection.drop()
  console.log('Users collection dropped')  

  console.log('Inserting boards data')
  const insertedBoards = await Board.insertMany(boardData)
  console.log('Seed boards inserted')

  console.log('Inserting cards data')
  const insertedCards = await Card.insertMany(cardData)
  console.log('Seed cards inserted')
  // console.log(insertedCards)

  console.log('Inserting users data')
  const insertedUsers = await User.insertMany(userData)
  console.log('Seed users inserted')
  console.log(insertedUsers)

  let cardIds = []
  insertedCards.map((card) => {
    cardIds.push(card._id)
  })
  console.log(cardIds)

  //insert cards IDs to Jello Board
  const boards = await Board.findOneAndUpdate({}, {$set: {"cards": cardIds}})
  console.log(boards)

  let boardIds = []
  insertedBoards.map((board) => {
    boardIds.push(board._id)
  })
  console.log(cardIds)

  //insert board IDs onto user doc
  const users = await User.findOneAndUpdate({username:"Admin"}, {$set: {"boards": boardIds}})
  console.log(users)

  mongoose.connection.close()
})

