const createLesson = (req, res) => {
  res.status(201).send({ text: 'lesson was created' });
};

module.exports = createLesson;
