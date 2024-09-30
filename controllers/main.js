import express from "express";
const router = express.Router();

import User from "../models/user.js";

router.get("/myCookBook", (req, res) => {
  console.log("this is going through this route");
  res.render("main.ejs", {
    user: req.session.user,
  });
});

export default router;
