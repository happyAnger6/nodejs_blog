var Tag = require('../models/tag');

exports.get_all_tags = function(callback) {
    Tag
        .find({})
        .select('name')
        .exec(function(err, tags){
            callback(err, tags);
        });
};

exports.is_tagIn = function(tags, tag) {
    if(tags) {
        var len = tags.length;
        for(var i = 0; i< len; i++){
            if(tags[i] == tag) return true;
        }
    }
    return false;
};

exports.add_newTags = function(oldTags, newTags){
    var bIn = false;
    if(newTags) {
       var oldLen = oldTags.length;
       var newLen = newTags.length;
       for(var i = 0; i < newLen; i++){
          for(var j = 0; j < oldLen; j++) {
              if(oldTags[j] == newTags[i]){
                  bIn = true;
                  break;
              }
          }
          if(bIn == false){
              oldTags.push(newTags[i]);
          }
       }
    }
    return oldTags;
};