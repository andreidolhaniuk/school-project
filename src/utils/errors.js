const { allowedFieldsUser, allowedFieldsTeacher, allowedFieldsLesson } = require('./allowedFields');

module.exports = {
  INVALID_EMAIL_ERROR: 'Invalid email',
  USER_ALLOWED_FIELDS_ERROR: `Make sure fields ${allowedFieldsUser.join()} are present in request`,
  EMAIL_OR_PASSWORD_ERROR: 'Either your login email or password is incorrect.',
  TEACHER_ALLOWED_FIELDS_ERROR: `Allowed fields for teacher are ${allowedFieldsTeacher.join()}`,
  LESSON_ALLOWED_FIELDS_ERROR: `Allowed fields are ${allowedFieldsLesson.join()}`,
  TEACHER_UPDATE_FIELDS_ERROR: `Teacher field does not have all needed fields. Allowed fields ${allowedFieldsTeacher.join()}. Extra fields will be ignored.`,
  LESSON_UPDATE_FIELDS_ERROR: `There is nothing to update. Allowed fields ${allowedFieldsLesson.join()}. Extra fields will be ignored`,
  TOKEN_ERROR: 'Please provide a token.',
};
