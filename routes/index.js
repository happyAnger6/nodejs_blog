var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var post = require('../lib/post');

/* GET home page. */
router.get('/', function(req, res, next) {
    post.get_popular_posts(3, function(err, popular_posts){
        post.get_recent_posts(3, function(err, recent_posts){
            if (err) throw err;
            Post.find({})
                .select('author title content publish_date')
                .exec(function(err, posts){
                    if (err) throw err;
                    var r_posts = [];
                    for(var i = 0; i < posts.length; i++){
                        r_posts[i] = posts[i];
                        if(i == 4) break;
                    }
                    var pages = Math.ceil(posts.length/5);
                    res.render('index', { posts:r_posts , start:1, pages:pages, populars:popular_posts, recents:recent_posts});
                });
        });
    });
});

module.exports = router;
