

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { DEFAULT_IMAGE_PATH } = require("../secrect");


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name cannot be more than 3 characters"],
    maxlength: [30, "Name cannot be more than 31 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Please enter a valid email",
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password cannot be less than 6 characters"],
    set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
  },
  image: {
    type: String,
    default: DEFAULT_IMAGE_PATH,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    minlength: [5, "Address cannot be less than 5 characters"],
    maxlength: [100, "Address cannot be more than 100 characters"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });

const User = model("Users", userSchema);


module.exports = User; 