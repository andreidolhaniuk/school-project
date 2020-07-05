const TEACHER_DATA = { name: 'Test', surname: 'Testovich' };

const GROUP_DATA = {
  number: 121,
};

const LESSSON_DATA = {
  subject: 'pure math',
  teacher: { name: 'Test', surname: 'Testovich' },
  group: 1000,
  classNumber: 204,
  order: 1,
};

const LESSSONS_DATA = [{
  subject: 'pure math',
  teacher: TEACHER_DATA,
  group: GROUP_DATA,
  class: 204,
  order: 2,
}, {
  subject: 'Computer science',
  teacher: TEACHER_DATA,
  group: GROUP_DATA,
  class: 204,
  order: 3,
}];

module.exports = {
  LESSSON_DATA,
  LESSSONS_DATA,
  GROUP_DATA,
  TEACHER_DATA,
};
