const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Lesson = require('../../src/models/lesson');
const Group = require('../../src/models/group');
const Teacher = require('../../src/models/teacher');
const User = require('../../src/models/user');

const teacher1 = { name: 'John', surname: 'Doe' };
const teacher2 = { name: 'Test', surname: 'Testovich' };
const teacher3 = { name: 'John', surname: 'Smith' };

const group1 = 121;
const group2 = 111;

const lesson1 = {
  _id: new mongoose.Types.ObjectId(),
  subject: 'Pure math',
  teacher: teacher1,
  group: group1,
  class: 204,
  order: 2,
};

const lesson2 = {
  _id: new mongoose.Types.ObjectId(),
  subject: 'Computer science',
  teacher: teacher2,
  group: group2,
  class: 204,
  order: 3,
};

const lesson3 = {
  subject: 'Geometry',
  teacher: teacher3,
  group: 123,
  class: 204,
  order: 4,
};

const lessonRepresentationInDB = {
  subject: 'Geometry',
  teacher: teacher3,
  group: { number: 123 },
  class: 204,
  order: 4,
};

const userId = new mongoose.Types.ObjectId();

const user = {
  _id: userId,
  email: 'example@example.com',
  password: 'secret',
  token: jwt.sign({ _id: userId.toString() }, process.env.SECRET_KEY),
};

const newUser = {
  email: 'test@test.com',
  password: 'secret',
};

const createLesson = async (lesssonData, groupNUmber, teacherData) => {
  const group = await Group.create({ number: groupNUmber });
  const teacher = await Teacher.create(teacherData);
  // eslint-disable-next-line no-underscore-dangle
  const lesson = new Lesson({ ...lesssonData, group: group._id, teacher: teacher._id });
  return lesson;
};

const configureDb = async () => {
  await Lesson.deleteMany();
  await Group.deleteMany();
  await Teacher.deleteOne();
  await User.deleteMany();
  await User.create(user);

  const lessonDoc1 = await createLesson(lesson1, group1, teacher1);
  const lessonDoc2 = await createLesson(lesson2, group2, teacher2);
  await Lesson.insertMany(lessonDoc1, lessonDoc2);
};

const closeConnection = () => {
  mongoose.connection.close();
};

module.exports = {
  configureDb,
  closeConnection,
  user,
  lesson1,
  lesson2,
  lesson3,
  teacher2,
  group2,
  newUser,
  lessonRepresentationInDB,
};
