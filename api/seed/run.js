require("dotenv").config({path:__dirname+'/../.env'})

const mongoose = require('mongoose')

const Card = require('../models/cards')
const seedData = require('../seed/seedData.json')

const dbURL = process.env.MONGODB_URL
console.log(dbURL)

mongoose.connect(dbURL, async () => {
  console.log('Connected to Cards db')

  console.log('Resetting Cards collection')
  await Card.collection.drop()
  console.log('Cards collection dropped')

  console.log('Inserting cards data')
  const insertedCards = await Card.insertMany(seedData)
  console.log('Seed cards inserted')
  console.log(insertedCards)

  mongoose.connection.close()
})
