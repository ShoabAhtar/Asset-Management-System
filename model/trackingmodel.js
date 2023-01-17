const mongoose = require('mongoose');
const trackingSchema = new mongoose.Schema({
  assetId: {
    type: String,
  },
  userId: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: String,
  },
});
exports.Track = mongoose.model('assests_tracking', trackingSchema);
