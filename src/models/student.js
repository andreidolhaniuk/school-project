const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  group: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Group',
  },
});

module.exports = mongoose.model('Student', studentSchema);
