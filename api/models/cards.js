const mongoose = require('mongoose')

const cardSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: String
  },
  { timestamps: true }
)
const Card = mongoose.model('Card', cardSchema)

module.exports = Card