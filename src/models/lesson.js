const mongoose = require('mongoose');

const lesssonSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Teacher',
  },
  group: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Group',
  },
  class: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Lesson', lesssonSchema);
