import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ingredients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Ingredient",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
