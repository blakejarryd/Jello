require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const whitelist = ['http://localhost:3001']

const cardsController = require("./controllers/cards")

app.use(express.json())

app.use("/cards", cardsController)

mongoose.connect(dbURL, () => {
  console.log("connected to jello db")
})

app.listen(PORT, () => {
  console.log("port", PORT)
})
