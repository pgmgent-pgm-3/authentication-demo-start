/**
 * An authentication Controller
 */

import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

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
      const token = jwt.sign(
        { email: req.body.email },
        'dit is mijn salt zodat mijn gerecht er chaotisch uitziet'
      );
      console.log(token);
    }
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res) => {
  res.send("POST: Logout been hit");
};
