const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Teacher', teacherSchema);
