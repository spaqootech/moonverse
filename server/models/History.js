const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  nftid: {
    type: String,
    required: true
  },
  buyer: {
    type: String
  },
  price: {
    type: String
  },
});

module.exports = mongoose.model('history', HistorySchema);
