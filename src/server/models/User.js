const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: String,
  name: String,
  profile_image: String,
  habits: Array,
  logs: Array
});

global.User = global.User || mongoose.model('User', UserSchema);
module.exports = global.User;
