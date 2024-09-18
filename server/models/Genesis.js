const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenesisSchema = new Schema({
  nftid: {
    type: String,
    required: true
  },
  owner: {
    type: String
  },
  price: {
    type: String
  },
});

module.exports = mongoose.model('genesis', GenesisSchema);
