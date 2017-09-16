var express = require('express');
var router = express.Router();
var hbs = require('hbs');

var Comment = require('../models/post');
var post = require('../lib/post');
var tag = require('../lib/tag');

router.post('/post/:title', function(req, res, next){
    var title = req.params.title;
    tag.get_all_tags(function(err, tags){
        Post
            .findOne({title:title})
            .select('title content')
            .exec(function(err, post){
                if (err) throw err;
                res.render('postedit',{tags:tags, post:post});
            });
    })
});

module.exports = router;