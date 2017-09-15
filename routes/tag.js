var express = require('express');
var router = express.Router();
var hbs = require('hbs');

var Post = require('../models/post');
var post = require('../lib/post');
var tag = require('../lib/tag');

hbs.registerHelper('tagPageList', function(start, pages, tagName){
    var begin = ""
    var out = "";
    var end = "";
    var start_page = Number(start);
    var total_pages = Number(pages);
    var pages_total = total_pages - start_page;
    //console.log("postPageList: " + start_page + " pages: " + total_pages);
    begin = '<li><a href="/tags/' + tagName + '">首页</a></li>';
    if (start_page > 1)
    {
        // console.log("here 1");
        out += '<li><a href="/tags/' + tagName + '/list/' + Number(start_page - 1) + '">' + "..." + "</a></li>";
    }

    if(pages_total >= 5)
    {
        end = '<li><a href="/tags/' + tagName + '/list/' + Number(start_page + pages_total) + '">' + "..." + "</a></li>";
    }
    end += '<li><a href="/tags/' + tagName + '/list/' + total_pages + '">' + "尾页" + "</a></li>";

    var count = 0;
    for(var i = start_page; i <= total_pages; i++){
        console.log("page: " + i);
        out += '<li><a href="/tags/' + tagName + '/list/' + i + '">' + i + "</a></li>";
        count++;
        if(count >= 5){
            break;
        }
    }

    return begin + out + end;
});

router.get('/:name', function(req, res, next){
    var name = req.params.name;
    post.get_popular_posts(3, function(err, popular_posts) {
        post.get_recent_posts(3, function (err, recent_posts) {
            tag.get_all_tags(function(err, all_tags){
                if (err) throw err;
                post.get_all_tagPosts(name, 0, function(posts){
                    if (err) throw err;
                    var r_posts = [];
                    var start = 0;
                    var r_count = 0;
                    for (var i = start; i < posts.length; i++) {
                        r_posts[i] = posts[i];
                        r_count++;
                        if (r_count == 5) break;
                    }
                    var pages = Math.ceil(posts.length / 5);
                    res.render('tagpage', {posts: r_posts, start: 1, pages: pages, populars:popular_posts, recents:recent_posts,
                        tags:all_tags, tagname:name});
            });
            });
        });
    });
});

router.get('/:name/list/:page', function(req, res, next){
    var name = req.params.name;
    var page = Number(req.params.page);
    post.get_popular_posts(3, function(err, popular_posts) {
        post.get_recent_posts(3, function (err, recent_posts) {
            post.get_all_tagPosts(name, 0, function(posts){
                tag.get_all_tags(function(err, all_tags){
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
                    res.render('tagpage', {posts: r_posts, start: page, pages: pages, populars:popular_posts, recents:recent_posts,
                        tags:all_tags, tagname:name});
                    });
                });
            });
        });
});

module.exports = router;
