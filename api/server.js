require("dotenv").config()
const express = require("express")
const session = require("express-session")
const mongoose = require("mongoose")
const mongoDbSession = require("connect-mongodb-session")
const cors = require('cors')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDbStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: "sessions"
})

const userController = require('./controllers/users')
const boardsController = require("./controllers/boards")
const cardsController = require("./controllers/cards")

const whitelist = ['http://localhost:3001']
app.use(cors({
  origin: (origin, cb) => {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true)
    } else {
      cb(new Error())
    }
  }
}))

app.use(express.json())

app.use("/boards", boardsController)
app.use("/cards", cardsController)


mongoose.connect(dbURL, () => {
  console.log("connected to jello db")
})

app.listen(PORT, () => {
  console.log("port", PORT)
})
