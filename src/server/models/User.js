const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  name: String,
  profile_image: String
});

global.User = global.User || mongoose.model('User', UserSchema);
module.exports = global.User;
