const readLessons = require('./readLessons');
const createLesson = require('./createLesson');
const updateLesson = require('./updateLesson');
const deleteLesson = require('./deleteLesson');
const register = require('./auth/register');
const logIn = require('./auth/logIn');
const logOut = require('./auth/logOut');

module.exports = {
  readLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  register,
  logIn,
  logOut,
};
