// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LanguageSchema = new Schema({
    title: String
});

module.exports = LanguageSchema;

// set up a mongoose model and pass it using module.exports
// module.exports = mongoose.model('Language', Language);
