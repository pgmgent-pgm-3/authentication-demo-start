/**
 * A Register Controller
 */

import { getConnection } from 'typeorm';

export const register = async (req, res) => {
  // errors
  const formErrors = [{
    message: "Another annoying error."
  }, {
    message: "Something went wrong."
  }]

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text',
    error: "Something went wrong"
  }, {
    name: 'password',
    label: 'Password',
    type: 'password'
  }]

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
}

export const login = async (req, res) => {
  // errors
  const formErrors = []

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text'
  }, {
    name: 'password',
    label: 'Password',
    type: 'password'
  }]

  // render the login page
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors
  });
}