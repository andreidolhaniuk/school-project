const { checkAllFieldsPresent } = require('../../utils/checkBodyFields');
const { allowedFieldsUser } = require('../../utils/allowedFields');
const { USER_ALLOWED_FIELDS_ERROR } = require('../../utils/errors');
const { REGISTRATION_CONFIRMATION } = require('../../utils/confirmations');
const User = require('../../models/user');

// eslint-disable-next-line consistent-return
const register = async (req, res) => {
  const { body } = req;
  if (checkAllFieldsPresent(allowedFieldsUser, body)) {
    const { email, password } = body;
    const user = new User({ email, password });
    try {
      await user.save();
    } catch (e) {
      return res.status(400).send({ error: e.message });
    }
    res.send({ text: REGISTRATION_CONFIRMATION });
  } else {
    res.status(400).send({ error: USER_ALLOWED_FIELDS_ERROR });
  }
};

module.exports = register;
