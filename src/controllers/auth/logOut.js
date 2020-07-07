const { LOGOUT_CONFIRMATION } = require('../../utils/confirmations');

const logOut = async (req, res) => {
  try {
    const { user } = req;
    user.token = undefined;
    await user.save();
    res.send({ text: LOGOUT_CONFIRMATION });
  } catch (e) {
    res.starus(500).send();
  }
};

module.exports = logOut;
