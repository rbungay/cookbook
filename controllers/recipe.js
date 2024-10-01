import express from "express";
const router = express.Router();
import Recipe from "../models/recipe.js";

import User from "../models/user.js";

router.get("/myCookBook/add-recipe", (req, res) => {
  res.render("cookbook/addRecipe.ejs", {
    user: req.session.user,
  });
});

router.post("/myCookBook/add-recipe", async (req, res) => {
  try {
    const { name, instructions, owner } = req.body; // Destructure the required fields
    const ingredients = req.body.ingredients || []; // Handle ingredients (empty array if none)

    // Use Recipe.create() to save the recipe in one step
    await Recipe.create({
      name,
      instructions,
      owner,
      ingredients, // Include ingredients (if any)
    });

    // Redirect to the main cookbook page after adding the recipe
    res.redirect("/myCookBook"); // Redirect to the main cookbook page
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).send("Error adding recipe. Please try again later.");
  }
});

export default router;
