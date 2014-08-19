var moment = require('moment');

var Post = function(title, body){
  return {
    title:title,
    body:body,
    time: moment().format()
  };
};

module.exports = Post;
