const { checkAllFieldsPresent } = require('../../utils/checkBodyFields');
const { allowedFieldsUser } = require('../../utils/allowedFields');
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
    res.send({ text: 'You have successfully registered. You can now log in.' });
  } else {
    res.send({ error: `Make sure fields ${allowedFieldsUser.join()} are present in request` });
  }
};

module.exports = register;
