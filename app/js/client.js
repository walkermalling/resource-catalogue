var $ = require('jquery');
var Post = require('./post');
var postify = require('./postify');

var welcome = new Post('Welcome!','Welcome to the full-stack javascript engineering resource catalogue.');

$('body').append(postify(welcome));
