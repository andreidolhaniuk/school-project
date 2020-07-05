/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');
const Group = require('../src/models/group');
const Teacher = require('../src/models/teacher');
const { LESSSONS_DATA, TEACHER_DATA, GROUP_DATA } = require('./testData');

const URL = '/lessons';

// eslint-disable-next-line no-undef
beforeEach(async () => {
  await Lesson.deleteMany();
  await Group.deleteMany();
  await Teacher.deleteMany();
});

// eslint-disable-next-line no-undef
describe('Test read operation', () => {
  // eslint-disable-next-line no-undef
  test('Read the lessons. Should return status code 200', async () => {
    const response = await request(app).get(URL);
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });

  // eslint-disable-next-line no-undef
  test('Read the lessons. Response body should not be null.', async () => {
    const response = await request(app).get(URL);
    // eslint-disable-next-line no-undef
    expect(response.body).not.toBeNull();
  });

  // eslint-disable-next-line no-undef
  test('Read the lessons. Request body should be an array with provided objects', async () => {
    const groupDocument = await Group.create(GROUP_DATA);
    const teacherDocument = await Teacher.create(TEACHER_DATA);

    LESSSONS_DATA[0].teacher = teacherDocument._id;
    LESSSONS_DATA[1].teacher = teacherDocument._id;
    LESSSONS_DATA[0].group = groupDocument._id;
    LESSSONS_DATA[1].group = groupDocument._id;
    await Lesson.insertMany(LESSSONS_DATA);
    const lessons = await Lesson.find().populate('teacher').populate('group');
    const response = await request(app).get(URL);
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject(
      {
        lessons: lessons.map((each) => each.toObject(
          {
            transform: (doc, ret) => {
              // eslint-disable-next-line no-param-reassign
              ret._id = ret._id.toString();
              return ret;
            },
          },
        )),
      },
    );
  });
});

// eslint-disable-next-line no-undef
afterAll(() => {
  mongoose.connection.close();
});
