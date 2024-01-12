const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'User must type name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "User must type email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must type password'],
  },
  token: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
  },
});

module.exports = mongoose.model('User', userSchema);
