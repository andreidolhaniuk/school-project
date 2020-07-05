const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { shouldBePositiveNumber } = require('../utils/customValidation');

const lesssonSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
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
    validate: shouldBePositiveNumber,

  },
  order: {
    type: Number,
    required: true,
    unique: true,
    validate: shouldBePositiveNumber,
  },
});

lesssonSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Lesson', lesssonSchema);
