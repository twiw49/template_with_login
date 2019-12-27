const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  name: String
});

global.User = global.User || mongoose.model('User', UserSchema);
module.exports = global.User;
