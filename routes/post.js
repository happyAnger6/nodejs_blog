var express = require('express');
var router = express.Router();
var hbs = require('hbs');

var Post = require('../models/post');
var post = require('../lib/post');
var tag = require('../lib/tag');

hbs.registerHelper('popularPosts', function(counts){
  Post
      .find({})
      .sort('-likes')
      .limit(Number(counts))
      .select('title')
      .exec(function(err, posts){
            if (err) throw  err;
            if(null != posts) {
                for(var i = 0; i < posts.length; i++){
                    var post = posts[i];
                    out += '<li><a href="/post/details/' + post.title +  '" class="more">' + post.title + "</a></li>";
                }
            }
      });
});

hbs.registerHelper('postPageList', function(start, pages){
    var begin = ""
    var out = "";
    var end = "";
    var start_page = Number(start);
    var total_pages = Number(pages);
    var pages_total = total_pages - start_page;
    console.log("postPageList: " + start_page + " pages: " + total_pages);
    begin = "<li><a href='/'>首页</a></li>";
    if (start_page > 1)
    {
       // console.log("here 1");
        out += '<li><a href="/post/list/' + Number(start_page - 1) + '">' + "..." + "</a></li>";
    }

    if(pages_total >= 5)
    {
        end = '<li><a href="/post/list/' + Number(start_page + pages_total) + '">' + "..." + "</a></li>";
    }
    end += '<li><a href="/post/list/' + total_pages + '">' + "尾页" + "</a></li>";

    var count = 0;
    for(var i = start_page; i <= total_pages; i++){
      console.log("page: " + i);
      out += '<li><a href="/post/list/' + i + '">' + i + "</a></li>";
      count++;
      if(count >= 5){
          break;
      }
    }

    return begin + out + end;
});

router.get('/postedit', function(req, res, next){
    tag.get_all_tags(function(err, tags){
        console.log("tags", tags);
        res.render('postedit',{tags:tags});
    })
});

router.get('/postedit/:title', function(req, res, next){
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

router.get('/list/:page', function(req, res, next){
    post.get_popular_posts(3, function(err, popular_posts) {
        post.get_recent_posts(3, function (err, recent_posts) {
            var page = Number(req.params.page);
            Post.find({})
                .select('author title content publish_date')
                .exec(function (err, posts) {
                    if (err) throw err;
                    var r_posts = [];
                    var start = 5 * (page - 1);
                    var r_count = 0;
                    for (var i = start; i < posts.length; i++) {
                        r_posts[i] = posts[i];
                        r_count++;
                        if (r_count == 5) break;
                    }
                    var pages = Math.ceil(posts.length / 5);
                    res.render('postpage', {posts: r_posts, start: page, pages: pages, populars:popular_posts, recents:recent_posts});
                });
        });
    });
});

router.get('/details/:title', function(req, res, next){
    var title = req.params.title;
    Post.findOne({'title': title})
        .exec(function(err, post){
          if (err) throw err;
     //     console.log("detail: " + post);
          res.render('one_post',{post:post});
        });
});

router.post('/addLikes', function (req, res, next) {
   var title = req.body.title;
   var likes = req.body.likes;
   var query  = Post.findOne({'title': title});
   query.exec(function(err, post){
       if (err) throw err;
       post.likes = Number(likes) + 1;
       post.save(function(err){
           if (err) throw err;
       });
       res.status(200).json(
           {'likes': likes}
       ).end();
   });
});

router.post('/subLikes', function (req, res, next) {
    var title = req.body.title;
    var likes = req.body.likes;
    var query  = Post.findOne({'title': title});
    query.exec(function(err, post){
        if (err) throw err;
        post.un_likes = Number(likes) + 1;
        post.save(function(err){
            if (err) throw err;
        });
        res.status(200).json(
            {'unlikes': likes}
        ).end();
    });
});

router.post('/postedit', function(req, res, next){
    var title = req.body.title;
    var content = req.body.content;
    var new_url = '/post/details/' + title;
    //console.log("parms:" + req.params + "body:title:" + title + "content:" + content);
    var query = Post.findOne({'title': title});
    query.exec(function(err, post){
        if (err) throw err;
        var date = new Date();
        var now = date.toUTCString();
        if (null == post) {
            var new_post = new Post({title:title, content:content, publish_date:now, date:date.getTime()});
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
        res.redirect(new_url);
    });
});

router.post('/new', function(req, res, next){
   // console.log("parms:" + req.params + "body:" + req.body.title + req.body.content);
    res.render('one_post');
});

module.exports = router;