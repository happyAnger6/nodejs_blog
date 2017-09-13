var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var Category = new Scheme({
    name: String,
    posts: [String],
    parent: String
});

module.exports = mongoose.model('Category', Category);