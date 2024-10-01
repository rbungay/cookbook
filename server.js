import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import methodOverride from "method-override";
import morgan from "morgan";
import session from "express-session";

import authController from "./controllers/auth.js";
import mainController from "./controllers/main.js";
import recipeController from "./controllers/recipes.js";
import ingredientsController from "./controllers/ingredients.js";
import isSignedIn from "./middleware/is-signed-in.js";
import passUserToView from "./middleware/pass-user-to-view.js";

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.get("/vip-lounge", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send("Sorry, no guests allowed.");
  }
});

app.use(passUserToView);
app.use("/auth", authController);
app.use(isSignedIn);
app.use("/", mainController);
app.use("/", recipeController);
app.use("/", ingredientsController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
