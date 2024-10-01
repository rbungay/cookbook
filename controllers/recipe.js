import express from "express";
const router = express.Router();

import User from "../models/user.js";

router.get("/myCookBook/add-recipe", (req, res) => {
  res.render("cookbook/addRecipe.ejs", {
    user: req.session.user,
  });
});

export default router;
