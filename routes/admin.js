var express = require('express');
var router = express.Router;

var Category = require('../models/category');

router.get('/admin', function(req, res, next){
    res.render('admin')
});

router.post('/admin/category', function(req, res, next){
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
