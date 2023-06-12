const { default: mongoose } = require("mongoose");

const User = require("../models/userMode");

const findUserById = async (id, options = {}) => {
  try {
    const user = await User.findById(id, options);

    if (!user) {
      throw creatError(404, "User not found");
    }

    return user;

  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw creatError(400, "Invalid user ID");
    }
    throw err;
  }
};

module.exports = { findUserById };
