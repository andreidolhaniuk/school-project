const { checkAllFieldsPresent } = require('../../utils/checkBodyFields');
const { allowedFieldsUser } = require('../../utils/allowedFields');
const User = require('../../models/user');

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
      res.status(400).send({ error: e.messsage });
    }
  } else {
    res.send({ error: `Make sure fields ${allowedFieldsUser.join()} are present in request` });
  }
};

module.exports = logIn;
