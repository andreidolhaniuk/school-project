const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  students: [{ type: mongoose.Schema.ObjectId, ref: 'Student' }],
});

// eslint-disable-next-line func-names
groupSchema.statics.findOneOrCreate = async function (number) {
  const Group = this;
  try {
    const group = await Group.findOne({ number });
    if (group) {
      return group;
    }
    return await new Group({ number }).save();
  } catch {
    return null;
  }
};

module.exports = mongoose.model('Group', groupSchema);
