/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  // render the home page
  res.render("home", {
    user: req.user,
  });
};
