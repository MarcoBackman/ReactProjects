const mongoose = require('mongoose');
const { Schema } = mongoose;

//create a schema for the model
var Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: String,
    description: String,
    image: String,
    recipeYield: String,
    cookTime: String,
    prepTime: String,
    ingredients: [],
});

// Export model, so we can import it in other files.
export default mongoose.model("Recipe", RecipeSchema);