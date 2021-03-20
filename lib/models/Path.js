
const { db, mongoose } = require('./db')

const schema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }, tldr: {
    type: String,
    required: true
  }, body: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
    required: true
  }, editors: {
    default: [],
    type: Array,
    required: true
  }, nsfw: {
    default: false,
    type: Boolean,
    required: true
  }, parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'paths',
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.models.paths || mongoose.model("paths", schema);