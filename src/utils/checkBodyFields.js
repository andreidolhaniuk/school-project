const checkAllFieldsPresent = (allowedFields, body) => {
  if (body) {
    const fields = Object.keys(body);
    return allowedFields.every((each) => fields.includes(each));
  }
  return false;
};

const checkAtleastOneFieldPresent = (allowedFields, body) => {
  if (body) {
    const fields = Object.keys(body);
    return allowedFields.some((each) => fields.includes(each));
  }
  return false;
};

module.exports = {
  checkAllFieldsPresent,
  checkAtleastOneFieldPresent,
};
