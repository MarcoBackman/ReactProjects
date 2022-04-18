let mongoose = require('mongoose');
let mongoDB = 'mongodb://localhost:27017/RecipeDB';
let express = require('express');
//import Recipe from '../models/Recipe';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let router = express.Router();

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
let Recipe = mongoose.model("userRecipe", RecipeSchema);

// This section will help you create a new document.
router.post('/', (req, res) => {
    console.log("Post request");
    const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        recipeYield: req.body.recipeYield,
        cookTime: req.body.cookTime,
        prepTime: req.body.prepTime,
        ingredients: req.body.ingredients,
    });

    newRecipe.save(function (err) {
        if (err) return console.error(err);
        console.log("Data saved");
    });

    res.send(newRecipe);
});

module.exports = router;