const mongoose = require('mongoose');
const crypto = require('crypto');

//For user Register
let UserSchema = new mongoose.Schema({
    id:
        {
            type : String,
            required : true
        },
    email:
        {
            type : String,
            required : stringField
        },
    hash : String,
    salt : String
});

UserSchema.methods.setPassword = function(password) {
    // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');
    // Hashing user's salt and password with 1000 iterations,
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

function stringField() {
    return typeof this.email !== 'string';
}

//Create Movie model based on movieData Schema
module.exports = mongoose.model('User', UserSchema);