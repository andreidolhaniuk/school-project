const logOut = async (req, res) => {
  try {
    const { user } = req;
    delete user.token;
    await user.save();
    res.send({ text: 'You have successfully logged out.' });
  } catch (e) {
    res.starus(500).send();
  }
};

module.exports = logOut;
