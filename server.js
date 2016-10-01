var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Video = require('./models/Video.js');
var Message = require('./models/Message.js');

// var passport = require('passport');
// var flash = require('connect-flash');
// var session = require('express-session');

var app = express();
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));


// app.use(session({secret: 'idunnothisisasecret'}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// require('./app/routes.js')(app, passport);

mongoose.connect('mongodb://localhost/captaincaption');
//mongoose.connect('mongodb://heroku_jns4phwt:61tt9c1oiotedcl5ndjhfv9pn5@ds019936.mlab.com:19936/heroku_jns4phwt');

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


// passport.use(new GoogleStrategy({
//     returnURL: 'http://localhost:3000/auth/google/return',
//     realm: 'http://localhost:3000/'
//   },
//   function(identifier, done) {
//     User.findByOpenID({ openId: identifier }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// app.get('/auth/google',
//   passport.authenticate('google'),
//   function(req, res){
//     // The request will be redirected to Google for authentication, so
//     // this function will not be called.
//   });

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });






app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

app.get('/api/saved', function(req, res) {

  Video.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

app.post('/api/saved', function(req, res){

  var newVideo = new Video({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  newVideo.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });

});

app.post('/api/message/saved', function(req, res){

  var newMessage = new Message({
    name: req.body.name,
    email: req.body.email,
    comments: req.body.comments
  });

  newMessage.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });

});


app.delete('/api/saved/:id', function(req, res){

  Video.find({'_id': req.params.id}).remove()
    .exec(function(err, doc) {
      res.send(doc);
  });

});



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
