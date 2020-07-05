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

// eslint-disable-next-line func-names
teacherSchema.statics.findOneOrCreate = async function (name, surname) {
  const Teacher = this;
  try {
    const teacher = await Teacher.findOne({ name, surname });
    if (teacher) {
      return teacher;
    }
    return await new Teacher({ name, surname }).save();
  } catch {
    return null;
  }
};
module.exports = mongoose.model('Teacher', teacherSchema);
