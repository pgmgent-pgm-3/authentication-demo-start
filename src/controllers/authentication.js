/**
 * An authentication Controller
 */

import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';

export const register = async (req, res) => {
  // errors
  const formErrors = [
    // {
    //   message: "Another annoying error.",
    // },
    // {
    //   message: "Something went wrong.",
    // },
  ];

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // render the register page
  res.render("register", {
    layout: "authentication",
    inputs,
    formErrors,
  });
};

export const login = async (req, res) => {
  // errors
  const formErrors = [];

  // input fields
  const inputs = [
     {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // render the login page
  res.render("login", {
    layout: "authentication",
    // toevoegen van data aan de view
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      res.send("You can register! YAY!");
    }
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      // get the user
      const userRepository = await DataSource.getRepository('User');

      // get a user with a specific email adress
      const user = await userRepository.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      })

      // authentication validation
      if(!user) {
        req.formErrors = [{ message: 'Gebruiker bestaat niet.' }];
        return next();
      }

      // create the JWT web token, aka our identity card
      const token = jwt.sign(
        { userId: user.id, email: req.body.email },
        process.env.TOKEN_SALT,
        { expiresIn: '1h' }
      );

      // create a cookie and add this to the response
      res.cookie('token', token, { httpOnly: true });

      // redirect to our root
      res.redirect('/');
    }
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
