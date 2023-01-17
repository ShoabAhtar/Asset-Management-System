const { response } = require('express');
const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  make: {
    type: String,
  },
  itemDescription: {
    type: String,
  },
  status: {
    type: String,
  },
  opeSys: {
    type: String,
  },
  purchasedDate: {
    type: Date,
  },
  price: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  productLife: {
    type: String,
  },
  user: {
    type: String,
  },
  dateOfIssuance: {
    type: Date,
  },
  dateOfReturn: {
    type: Date,
  },
  condition: {
    type: String,
  },

  qrCode: {
    type: String,
  },
});
exports.Asset = mongoose.model('assets', assetSchema); //This line
