const { mongoose } = require("mongoose");
const fs  = require("fs");

const creatError = require("http-errors");
const User = require("../models/userMode");
const { successResponse } = require("./responseController");
const { findUserById } = require("../services/findUserService");
const deleteImage = require("../helper/deleteImage");
const { creatJsonWebToken } = require("../helper/jsonWebToken");
const { JWT_ACTIVATION_KEY, CLIENT_URL } = require("../secrect");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 1;

    const searchRegex = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or:[
        { name: { $regex: searchRegex }},
        { email: { $regex: searchRegex }},
        { phone: { $regex: searchRegex }},
        { address: { $regex: searchRegex }},
      ]
    };

    const options = { password: 0, __v: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip(limit * (page - 1));

    const count = await User.find(filter).countDocuments();

    if (!users.length) {
      throw creatError(404, "Users not found");
    }

    return successResponse(res, {
       statusCode: 200,
       message: "Users were returned successfully",
       payload: {
        users: users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
        },
       }});

  } catch (err) {
    next(err);
  }
};


const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0, __v: 0 };
    const user = await findUserById(id);
    return successResponse(res, {
      statusCode: 200,
      message: "User was returned successfully",
      payload: { 
        user: user,
      },  
    });
  } catch (err) {
    next(err);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    user.image && deleteImage(user.image);
    await user.deleteOne({ _id: id, isAdmin: { $ne: true }});
    return successResponse(res, {
      statusCode: 200,
      message: "User was deleted successfully",
    });
  } catch (err) {
    console.log("Delete Error : ", err);
    next(err);
  }
};


const  processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (await User.findOne({ email: email })) throw creatError(409, "User already exists");

    const token = creatJsonWebToken( { name, email, password, phone, address }, JWT_ACTIVATION_KEY, "10m" );

    const emailData = {
        email,
        subject: "Account activation link",
        html: `
            <h1>Please use the following to activate your account</h1>
            <p> Please click here to <a href="${CLIENT_URL}/api/users/activate/${token}" target="_blank"> activate </a> your account</p>
        `
    }
     


    // const user = new User({
    //   name,
    //   email,
    //   password,
    //   phone,
    //   address,
    // });

    // await user.save();

    return successResponse(res, {
      statusCode: 200,
      message: "User was registered successfully",
      payload: {
        user: token,
      },

    });
  } catch (err) {
    next(err);
  }
};


module.exports = { getUsers, getUser, deleteUser, processRegister };
