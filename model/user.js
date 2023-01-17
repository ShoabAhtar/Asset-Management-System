const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
  },
  password: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
  },
  joinDate: {
    type: String,
  },
  level: {
    type: String,
  },
  cnic: {
    type: String,
  },
  team: {
    type: String,
  },
  organization: {
    type: String,
  },
  location: {
    type: Boolean,
  },
});
userSchema.method({
  async authenticate(password) {
    return bcrypt.compare(password, this.hash_password);
  },
});
exports.User = mongoose.model('users', userSchema); //This line
