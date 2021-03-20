const mongoose = require('mongoose')

const db = mongoose.connect(process.env.DATABASE_URL)

const convertToString = v => v && v.toString ? v.toString() : v

module.exports = {
  convertToString,
  db,
  mongoose
}