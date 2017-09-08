var express = require('express');
var router = express.Router();
var Post = require('../models/post');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/mydb');

router.get('/postedit', function(req, res, next){
    res.render('postedit');
});

router.get('/details/:title', function(req, res, next){
    var title = req.params.title;
    Post.findOne({'title': title})
        .exec(function(err, post){
          if (err) throw err;
          console.log("detail: " + post);
          res.render('one_post',{post:post});
        });
});

router.post('/postedit', function(req, res, next){
    var title = req.body.title;
    var content = req.body.content;
    console.log("parms:" + req.params + "body:title:" + title + "content:" + content);
    var query = Post.findOne({'title': title});
    query.exec(function(err, post){
        if (err) throw err;
        var date = new Date();
        var now = date.toUTCString();
        if (null == post) {
            var new_post = new Post({title:title, content:content, publish_date:now});
            new_post.save(function(err){
                if (err) throw err;
            });
        }else {
            post.content = content;
            post.last_modify_date = date;
            post.save(function(err){
                if (err) throw err;
            });
        }
        res.render('one_post',{post:post});
    });
});

router.post('/new', function(req, res, next){
    console.log("parms:" + req.params + "body:" + req.body.title + req.body.content);
    res.render('one_post');
});
module.exports = router;