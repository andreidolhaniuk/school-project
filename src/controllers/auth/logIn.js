const { checkAllFieldsPresent } = require('../../utils/checkBodyFields');
const { allowedFieldsUser } = require('../../utils/allowedFields');
const User = require('../../models/user');
const { USER_ALLOWED_FIELDS_ERROR } = require('../../utils/errors');

// eslint-disable-next-line consistent-return
const logIn = async (req, res) => {
  const { body } = req;
  if (checkAllFieldsPresent(allowedFieldsUser, body)) {
    const { email, password } = body;
    try {
      const user = await User.findUser(email, password);
      const token = await user.getToken();
      res.send({ token });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  } else {
    res.status(400).send({ error: USER_ALLOWED_FIELDS_ERROR });
  }
};

module.exports = logIn;
