require("dotenv").config()
const express = require("express")
const session = require("express-session")
const mongoose = require("mongoose")
const mongoDBSession = require("connect-mongodb-session")

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: "sessions"
})

const userController = require('./controllers/users')
const boardsController = require("./controllers/boards")
const cardsController = require("./controllers/cards")

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}))

app.use(express.json())
app.use("/users", userController)
app.use("/boards", boardsController)
app.use("/cards", cardsController)


mongoose.connect(dbURL, () => {
  console.log("connected to jello db")
})

app.listen(PORT, () => {
  console.log("port", PORT)
})
