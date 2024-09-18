const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestLandSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  wallet: {
    type: String
  },
  landAmount:{
    type: String
  },
  coinId: {
    type: String
  },
  serverType:{
    type: String
  },
});

module.exports = mongoose.model('requestland', RequestLandSchema);
