var Post = require('../models/post');

exports.get_popular_posts = function(count, callback){
    Post
        .find({})
        .limit(count)
        .sort('-likes')
        .select('title')
        .exec(function(err, posts){
            callback(err, posts);
        });
};

exports.get_recent_posts = function(count, callback){
    Post
        .find({})
        .limit(count)
        .sort('-date')
        .select('title')
        .exec(function(err, posts){
            callback(err, posts);
        });
};
