const shouldBePositiveNumber = (value) => {
  if (value < 0) throw new Error('group should be positive number');
};

module.exports = {
  shouldBePositiveNumber,
};
