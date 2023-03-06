/**
 * An authentication Controller
 */

import { validationResult } from "express-validator";

export const register = async (req, res) => {
  // errors
  const formErrors = [
    {
      message: "Another annoying error.",
    },
    {
      message: "Something went wrong.",
    },
  ];

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      error: "Something went wrong",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
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
    // properties of the first input field (email)
    {
      name: "email",
      label: "E-mail",
      type: "text",
    },
    // properties of the second input field (password)
    {
      name: "password",
      label: "Password",
      type: "password",
      error: "Password wrong!",
    },
    {
      name: "age",
      label: "Age",
      type: "number",
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
      console.log("Uh oh, we have validation errors!");

      return next();
    } else {
      res.send("You can register! YAY!");
    }
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res) => {
  res.send("POST: Login been hit");
};

export const logout = async (req, res) => {
  res.send("POST: Logout been hit");
};
