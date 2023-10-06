// Create web server application
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var port = process.env.PORT || 3000;

// Set up the body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up the database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});

// Create a schema for the comments
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create a model for the comments
var Comment = mongoose.model('Comment', commentSchema);

// Create a comment
// var comment = new Comment({name: 'John', comment: 'Hello there!'});

// Save the comment
// comment.save(function(err){
//     if(err) throw err;
//     console.log('Comment saved!');
// });

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Set up the static files
app.use(express.static(__dirname + '/public'));

// Set up the routes
app.get('/', function(req, res){
    res.render('index');
});

app.get('/get-comments', function(req, res){
    Comment.find({}, function(err, comments){
        if(err) throw err;
        res.send(comments);
    });
});

app.post('/post-comment', function(req, res){
    var comment = new Comment(req.body);
    comment.save(function(err){
        if(err) throw err;
        res.send(comment);
    });
});

// Start the server
app.listen(port, function(){
    console.log('Server listening on port ' + port);
});



