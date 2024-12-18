const mongoose = require('mongoose');

const bankEnum = [
  'State Bank of India (SBI)',
  'Credila',
  'Avanse',
  'ICICI Bank',
  'Axis Bank',
  'Union Bank of India',
  'Mpower Financing'
];

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: bankEnum, 
    unique: true
  },
  country: {
    type: String,
    required: true
  }
});

const Bank = mongoose.model('Bank', bankSchema);
module.exports = { Bank, bankEnum };
