// import dotenv
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";

import { VIEWS_PATH } from "./consts.js";

import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import DataSource from "./lib/DataSource.js";

// import actions from controllers
import { home } from "./controllers/home.js";
import { getUsers } from "./controllers/api/user.js";
import {
  login,
  register,
  postLogin,
  postRegister,
  logout,
} from "./controllers/authentication.js";

const app = express();
app.use(express.static("public"));

/*
 * Tell Express to use the Cookie Parser
 */
app.use(cookieparser());

/**
 * Import the body parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Handlebars Init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

/**
 * App Routing
 */

app.get("/", home);
app.get("/login", login);
app.get("/register", register);
app.post("/register", postRegister);
app.post("/login", postLogin);
app.post("/logout", logout);

/**
 * API Routing
 */

app.get("/api/user", getUsers);

// start the server
DataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
