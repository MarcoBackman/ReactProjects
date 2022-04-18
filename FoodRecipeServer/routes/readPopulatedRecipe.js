let mongoose = require('mongoose');
let mongoDB = 'mongodb://localhost:27017/RecipeDB';
let express = require('express');
//import Recipe from '../models/Recipe';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let router = express.Router();

var Schema = mongoose.Schema;
let RecipeSchema = require('mongoose').model("Recipe").schema;
let Recipe = mongoose.model("recipes", RecipeSchema);

// This section will help you create a new document.
router.get('/', (req, res) => {
    Recipe.find((err, docs) => {
        if (!err) {
            res.json(docs.length);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })
});

module.exports = router;