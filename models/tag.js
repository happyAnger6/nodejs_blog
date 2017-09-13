var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var Tag = new Scheme({
    name: String,
    posts: [String]
});

module.exports = mongoose.model('Tag', Tag);