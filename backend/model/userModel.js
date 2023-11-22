const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date().getTime() },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
