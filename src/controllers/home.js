/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  const userRole = req.user.role.label;
  if(userRole==="admin"){
    res.render("admin", {
      user: req.user,
    });
    return;
  }
  // render the home page
  res.render("home", {
    user: req.user,
  });
};
