const checkBodyFields = require('../utils/checkBodyFields');
const Teacher = require('../models/teacher');
const Group = require('../models/group');
const Lesson = require('../models/lesson');

const allowedFields = [
  'subject',
  'teacher',
  'group',
  'classNumber',
  'order',
];
const allowedTeacherFields = ['name', 'surname'];

// eslint-disable-next-line consistent-return
const createLesson = async (req, res) => {
  const { body } = req;
  if (checkBodyFields(allowedFields, body)) {
    const {
      subject,
      teacher,
      group,
      classNumber,
      order,
    } = body;
    if (checkBodyFields(allowedTeacherFields, teacher)) {
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
      res.status(201).send({ text: 'The lesson was created.' });
    } else {
      res.status(400).send({ error: `Allowed fields for teacher are ${allowedTeacherFields.join()}` });
    }
  } else {
    res.status(400).send({ error: `Allowed fields are ${allowedFields.join()}` });
  }
};

module.exports = createLesson;
