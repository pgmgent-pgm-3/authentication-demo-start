/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  // get the user repository
  const userRepository = DataSource.getRepository("User");

  // for DEMO, return the first user in the users table
  const userData = await userRepository.findOne({
    where: { id: null },
    relations: ["meta"],
  });

  // render the home page
  res.render("home", {
    userData,
  });
};
