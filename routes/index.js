var express = require('express');
var router = express.Router();

var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post
      .find({})
      .limit(5)
      .select('author title content publish_date')
      .exec(function(err, posts){
          if (err) throw err;
          res.render('index', { posts: posts });
      });
});

module.exports = router;
