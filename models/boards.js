const mongoose = require('mongoose')

const boardSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    columns: {type: [String], default: ["To Do", "Doing", "Done"]},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}]
  },
  { timestamps: true }
)
const Card = mongoose.model('Board', boardSchema)

module.exports = Card