const mongoose = require('mongoose');

const Lesson = require('../models/lesson');
const { LESSON_DELETION_CONFIRMATION } = require('../utils/confirmations');
// eslint-disable-next-line consistent-return
const deleteLesson = async (req, res) => {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) {
    try {
      const data = await Lesson.deleteOne({ _id: id });
      if (data.deletedCount) {
        res.send({ text: LESSON_DELETION_CONFIRMATION });
      } else {
        res.status(400).send({ text: `Lesson was not found by id ${id}` });
      }
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  } else {
    res.status(400).send({ text: `${id} is an invalid id` });
  }
};

module.exports = deleteLesson;
