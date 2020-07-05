module.exports = (allowedFields, body) => {
  if (body) {
    const fields = Object.keys(body);
    return allowedFields.every((each) => fields.includes(each));
  }
  return false;
};
