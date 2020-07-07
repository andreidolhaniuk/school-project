const mongoose = require('mongoose');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const Group = require('../models/group');

const { checkAtleastOneFieldPresent } = require('../utils/checkBodyFields');

const { allowedFieldsLesson, allowedFieldsTeacher } = require('../utils/allowedFields');
const { LESSON_UPDATE_CONFIRMATION } = require('../utils/confirmations');
const { TEACHER_UPDATE_FIELDS_ERROR, LESSON_UPDATE_FIELDS_ERROR } = require('../utils/errors');

// eslint-disable-next-line consistent-return
const updateLesson = async (req, res) => {
  const { id } = req.params;

  const { body } = req;
  const {
    subject,
    teacher,
    group,
    order,
  } = body;
  const classNumber = body.class;
  if (mongoose.isValidObjectId(id)) {
    if (checkAtleastOneFieldPresent(allowedFieldsLesson, body)) {
      try {
        const foundLesson = await Lesson.findById(id);
        if (foundLesson) {
          if (subject) {
            foundLesson.subject = subject;
          }
          if (teacher) {
            const { name, surname } = teacher;
            if (checkAtleastOneFieldPresent(allowedFieldsTeacher, teacher)) {
              if (name && surname) {
                const teacherDocument = await Teacher.findOneOrCreate(name, surname);
                // eslint-disable-next-line no-underscore-dangle
                foundLesson.teacher = teacherDocument._id;
              }
            } else {
              return res.status(400).send({ text: TEACHER_UPDATE_FIELDS_ERROR });
            }
          }
          if (group) {
            const groupDocument = await Group.findOneOrCreate(group);
            // eslint-disable-next-line no-underscore-dangle
            foundLesson.group = groupDocument._id;
          }
          if (classNumber) {
            foundLesson.class = classNumber;
          }
          if (order) {
            foundLesson.order = order;
          }
          await foundLesson.save();
          res.send({ text: LESSON_UPDATE_CONFIRMATION });
        } else {
          res.status(400).send({ text: `Lesson was not found by id ${id}` });
        }
      } catch (e) {
        res.status(500).send({ error: e.message });
      }
    } else {
      res.status(400).send({ error: LESSON_UPDATE_FIELDS_ERROR });
    }
  } else {
    res.status(400).send({ text: `${id} is an invalid id` });
  }
};

module.exports = updateLesson;
