var Comment = require('../models/comment');

exports.get_post_comments = function(post,callback){
    Comment
        .find({'post':post})
        .query(function(err, comments){
            callback(err, comments);
        });
};
