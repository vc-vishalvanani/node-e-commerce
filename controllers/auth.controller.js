const User = require("../models/user.model");
const HTTP = require("../config/constants");
const common_methods = require('../common/utility');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(HTTP.CONFLICT).send({
        message: 'User with this username is already exist!',
      });
    }
    
    const userModel = new User(req.body);
    userModel.password = await bcrypt.hash(userModel.password, 10);
    const userData = await userModel.save(); 

    const link = `http://localhost:8000/api/auth/confirmation/${userData.verification_str}`;
    const output = `
      <h1>Please click on below link for verify account</h1>
      <a href="${link}">Click here</a>
    `;

    common_methods.sendMail(req.body.email, 'Verify Account', output);
    res.status(HTTP.OK).send({
      message: 'User created successfully!',
      data: userData
    });
  } catch (error) {
    console.log(error);
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};

exports.hello = (req, res) => {
  res.send("Hello ");
}

exports.sendMail = (req, res) => {
  try {
    common_methods.sendMail(req.body.email, 'Welcome to Shiv Infotech!', 'Welcome to aboard! Now you can login using email and password.');
    res.status(HTTP.OK).send({message: 'Success!'})
  } catch (error) { 
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    });
    if (!user) {
      res.status(HTTP.UNAUTHORIZED).send({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
      );
    if (!validPassword) {
      return res.status(HTTP.UNAUTHORIZED).send({
        message: 'UnAuthorized',
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username
    };
    jwt.sign(payload, process.env.JWT_SECRET_KEY, { algorithm: 'HS256' }, (err, token) => {
      console.log('err: ', err);
      if (err) {
        res.status(HTTP.UNAUTHORIZED).send({ message: "Invalid credentials", err });
      }
      res.status(HTTP.OK).send({
        message: "Logged in successfully",
        token: `Bearer ${token}`,
      });
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Please enter valid email or password", error });
  }
};

exports.confirmation = async (req, res) => {
  try {
    const item = await User.find({
      "verification_str": req.params.id
    })
    if(item.length) { 
      await User.updateMany({'_id': item[0]._id}, { $set: { "active" : true }, $unset: { verification_str: req.params.id } })
      res.status(HTTP.OK).send({
        message: "Account verification successfully done.",
      });
    } else {
      res.status(HTTP.CONFLICT).send({message: "User data not found!"});
    }
  } catch(error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}

exports.forgotPassword = async (req, res) => { 
  const { email } = req.body;
  console.log('email: ', email);
    try {
      const user = await User.find({ email });
      console.log('user: ', user);
  
      if (!user) {
        return res.status(404).json({
          error: 'User not found. Please check the provided email address.',
        });
      }
      console.log("122");
      const resetPassToken = common_methods.makeId(32)
      console.log('resetPassToken: ', resetPassToken);
      console.log('user._id: ', user[0]._id);
      await User.updateMany({'_id': user[0]._id}, { $set: { "reset_pass_verification" : resetPassToken }})
      console.log("128");
      const link = `http://localhost:8000/api/auth/resetPassword/${user[0].reset_pass_verification}`;
      const output = `
        <h1>Please click on below link to reset password</h1>
        <a href="${link}">Click here</a>
      `;

      common_methods.sendMail(req.body.email, 'Reset Password', output);
      console.log("135");
      res.status(HTTP.OK).send({
        message: 'Reset Password instruction have been sent to your email.'
      });

    } catch (error) {
      res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
    }
}

exports.resetPassword = async function (req, res) { 
  const { password } = req.body;
  console.log('password: ', password);

  const reset_pass_verification = req.params.id;

  try {
    if(!password) {
      res.status(400).json({
        error: 'Password data missing. Please attach new password.',
      });
    }

    const user = await User.findOne({
      reset_pass_verification
    });
    console.log('user: ', user);

    if (!user) {
      res.status(400).json({
        error: 'Invalid reset password token.',
      });
    } 

    const newPassword = await bcrypt.hash(password, 10);
    await User.updateMany({'_id': user._id}, { $set: { "password" : newPassword }, $unset: { "reset_pass_verification": reset_pass_verification } })

    res.status(HTTP.OK).send({
      message: "Password reset successful. now you can login with new password.",
    });
  } catch (e) { 
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}