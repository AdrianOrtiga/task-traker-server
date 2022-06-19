const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now().toString(),
  },
  reminder: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: String,
    required: true,
    // default: 'Nameless',
  }
})

module.exports = mongoose.model('Task', taskSchema)

