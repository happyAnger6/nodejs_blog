var Tag = require('../models/tag');

exports.get_all_tags = function(callback) {
    Tag
        .find({})
        .select('name')
        .exec(function(err, tags){
            callback(err, tags);
        });
};