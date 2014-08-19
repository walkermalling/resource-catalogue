var postify = function(post){
    return '<div><h4>'+post.title+'</h4><p>'+post.body+'</p><footer>'+post.time+'</footer></div>';
};

module.exports = postify;
