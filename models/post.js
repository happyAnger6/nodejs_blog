var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var Post = new Scheme({
    author: {type:String, default:"安哥6"},
    title: String,
    content: String,
    publish_date: String,
    last_modify_date: String,
    tags: [String],
    comments: [String],
    date: Number,
    likes: {type:Number, default:0},
    un_likes: {type:Number, default:0}
});

module.exports = mongoose.model('Post', Post);