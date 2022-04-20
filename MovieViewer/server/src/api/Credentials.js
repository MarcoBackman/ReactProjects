let mongoose = require('mongoose');
let mongoDB = 'mongodb://localhost:27017/movie-SungJunBaek-4804';
let express = require('express');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let router = express.Router();

//create a schema for the model
var Schema = mongoose.Schema;


// Export model, so we can import it in other files.
let Recipe = mongoose.model("Recipe", RecipeSchema);

// This section will help you create a new document.
router.post('/login', (req, res) => {
    console.log("Post request");

    newRecipe.save(function (err) {
        if (err) return console.error(err);
        console.log("Data saved");
    });

    res.send(newRecipe);
});

module.exports = router;