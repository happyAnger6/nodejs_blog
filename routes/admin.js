var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var Category = require('../models/category');
var Tag = require('../models/tag');

var handlerbars = require('handlebars');

hbs.registerHelper('getpage', function(pagename){
    var page = "";
    return page;
});

router.get('/', function(req, res, next){
    res.render('admin',{lists:[{name:"标签管理", url:"/admin/tags"},{name:"类别管理", url:"/admin/category"}]});
});

router.get('/tags', function(req, res, next){
    res.render('admin',{pagename:'tags'});
});

router.post('/tags', function(req, res, next){
    var name = req.body.name;
    var query = Tag.findOne({'name': name});
    query.exec(function(err, tag){
        if (err) throw err;
        if (null == tag) {
            var new_tag = new Tag({name:name, posts:[]});
            new_tag.save(function(err){
                if (err) throw err;
            });
        }
        res.redirect('/admin');
    });
});
router.post('/category', function(req, res, next){
    var name = req.body.name;
    var parent = req.body.parent;
    var query = Category.findOne({'name': name});
    query.exec(function(err, category){
        if (err) throw err;
        if (null == category) {
            var new_category = new Category({name:name, parent:parent, posts:[]});
            new_category.save(function(err){
                if (err) throw err;
            });
        }else {
            new_category.parent = parent;
            new_category.save(function(err){
                if (err) throw err;
            });
        }
        res.redirect('/admin/category');
    });
});

module.exports = router;
