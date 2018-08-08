// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LanguageSchema = require('./language');

var UserSchema = new Schema();

UserSchema.add({
    name: String,
    email: { type: String, unique: true },
    lastname: String,
    languages: [LanguageSchema],
    firstname: String,
    password: String,
    admin: Boolean
});

// set up a mongoose model and pass it using module.exports
module.exports = UserSchema;
