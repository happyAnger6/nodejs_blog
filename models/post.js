var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var Post = new Scheme({
    author: {type:String, default:"安哥6"},
    title: String,
    content: String,
    publish_date: String,
    last_modify_date: String,
    tags: [String]
});

module.exports = mongoose.model('Post', Post);