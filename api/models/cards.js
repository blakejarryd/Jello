const mongoose = require('mongoose')

const cardSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    status: String
  },
  { timestamps: true }
)
const Card = mongoose.model('Cards', cardSchema)

module.exports = Card