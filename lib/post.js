var Post = require('../models/post');
var taglib = require('../lib/tag');

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

exports.get_all_tagPosts = function(tag, start, callback) {
    Post.find({})
        .exec(function(err, posts){
            if (err) throw err;
            var len = posts.length;
            var all_tagPosts = [];
            var j = 0;
            for(var i = 0; i < len; i++){
                if(taglib.is_tagIn(posts[i].tags, tag)){
                    if(j >= start){
                        all_tagPosts.push(posts[i]);
                    }
                    j++;
                }
            }
            callback(all_tagPosts);
        })
};