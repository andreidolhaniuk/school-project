const Lesson = require('../models/lesson');

const readLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('group').populate('teacher');
    res.send({ lessons });
  } catch (e) {
    res.send({ error: e.message });
  }
};

module.exports = readLessons;
