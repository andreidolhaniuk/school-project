const { checkAllFieldsPresent } = require('../utils/checkBodyFields');
const Teacher = require('../models/teacher');
const Group = require('../models/group');
const Lesson = require('../models/lesson');
const { allowedFieldsLesson, allowedFieldsTeacher } = require('../utils/allowedFields');
const { LESSON_CREATION_CONFIRMATION } = require('../utils/confirmations');
const { TEACHER_ALLOWED_FIELDS_ERROR, LESSON_ALLOWED_FIELDS_ERROR } = require('../utils/errors');

// eslint-disable-next-line consistent-return
const createLesson = async (req, res) => {
  const { body } = req;
  if (checkAllFieldsPresent(allowedFieldsLesson, body)) {
    const {
      subject,
      teacher,
      group,
      order,
    } = body;
    const classNumber = body.class;
    if (checkAllFieldsPresent(allowedFieldsTeacher, teacher)) {
      try {
        const teacherDocument = await Teacher.findOneOrCreate(teacher.name, teacher.surname);
        const groupDocument = await Group.findOneOrCreate(group);
        const lessonDocument = new Lesson({
          subject,
          // eslint-disable-next-line no-underscore-dangle
          teacher: teacherDocument._id,
          // eslint-disable-next-line no-underscore-dangle
          group: groupDocument._id,
          class: classNumber,
          order,
        });
        await lessonDocument.save();
      } catch (e) {
        return res.status(400).send({ error: e.message });
      }
      res.status(201).send({ text: LESSON_CREATION_CONFIRMATION });
    } else {
      res.status(400).send({ error: TEACHER_ALLOWED_FIELDS_ERROR });
    }
  } else {
    res.status(400).send({ error: LESSON_ALLOWED_FIELDS_ERROR });
  }
};

module.exports = createLesson;
