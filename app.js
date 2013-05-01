
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , room = require('./routes/room')
  , level = require('./routes/level')
  , Room = require('./models/Room')
  , Role = require('./models/Role')
  , User = require('./models/User')
  , Level = require('./models/Level')
  , http = require('http')
  , path = require('path');

var app = express();

var role1 = new Role({
	name : "admin"
});
var role2 = new Role({
	name : "customer"
});

role1.save();
role2.save();

/*

Role.find({},function(err,rooms){
  console.log("Room: "+rooms);
});
User.find({},function(err,users){
	console.log("User: "+users);
});
Level.find({},function(err,levels){
	console.log("levels: "+levels);
});*/

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/room/add',room.add);
app.get('/room/delete/:room_num',room.delete);
app.get('/room/search/:room_num',room.search);
app.post('/room/modify',room.modify);
app.post('/room/book',room.book);
app.get('/room/unbook/:room_num',room.unbook);
app.get('/u/login', user.index);
app.post('/u/login', user.login);
app.post('/u/reg',user.reg)
app.post('/level/add',level.add)
app.get('/level/delete/:id',level.delete)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});