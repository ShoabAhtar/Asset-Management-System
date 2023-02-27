const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  joinDate: {
    type: String,
    default: null,
  },
  level: {
    type: String,
    default: null,
  },
  cnic: {
    type: String,
    default: null,
  },
  team: {
    type: String,
    default: null,
  },
  organization: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});
userSchema.method({
  async authenticate(password) {
    return bcrypt.compare(password, this.hash_password);
  },
});
exports.User = mongoose.model('users', userSchema); //This line
