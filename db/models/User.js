const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  username: {
    type: String,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User


