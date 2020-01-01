const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HabitSchema = new Schema({
  _id: String,
  userId: String,
  items: Array
});

global.Habit = global.Habit || mongoose.model('Habit', HabitSchema);
module.exports = global.Habit;
