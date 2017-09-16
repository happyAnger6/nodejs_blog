var mongoose = require('mongoose');
var Scheme = mongoose.Schema();
var Comment = new Scheme({
    author:String,
    title:String,
    post:String,
    content:String,
    publist_date:String,
    date:Number,
    replay:[Comment]
});

module.exports = mongoose.Model('Comment', Comment);