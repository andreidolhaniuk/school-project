const allowedFieldsLesson = [
  'subject',
  'teacher',
  'group',
  'classNumber',
  'order',
];

const allowedFieldsTeacher = ['name', 'surname'];

const allowedFieldsUser = ['email', 'password'];

module.exports = {
  allowedFieldsTeacher,
  allowedFieldsLesson,
  allowedFieldsUser,
};
