
var Room = require('../models/Room');
var Level = require('../models/Level');
var User = require('../models/User');


//post
exports.add = function(req, res){
	console.log("MMMMM " + req.body['level']);
    Room.findOne({num :req.body['num']},function(err,room){
		Level.findOne({name : req.body['level']},function(errr,level){ 
			console.log("MMMMMA " + level);
		  	if(!!room){  		
				room.num = req.body['num'];
				room.level = level;
				room.save();
				res.send({
					success : true,
					room : room
				})
			}else if(!room){
			  	room = new Room({
			  	   num : req.body['num']
			  	   ,level : level
			  	   ,ifbook : false
			    });
			    room.save();
			    res.send({ 
					success : true,
					room : room
				});
			}
		});
  	})  
};

//get
exports.delete = function(req,res){
	Room.remove({
		num : req.params.room_num
	},function(err,room){
		console.log("remove: " + room);
		res.send({
			room : room,
			success : true
		});
	});
}


//post
exports.search = function(req,res){
	Room.findOne({
		num : parseInt(req.params.room_num)
	},function(err,room){
		console.log(room);
		res.send({
			room : room,
			success : true
		});
	});
}

//post
exports.book = function(req,res){
	Room.findOne({
		num : req.body['num']
	},function(err,room){
		room.user = req.body['user'];
		room.starttime = req.body['starttime'];
		room.endtime = req.body['endtime'];
		room.ifbook = true;
		room.save();
		console.log("after: "+room);
		res.send({
			room : room,
			success : true
		});
	});
}

//get
exports.unbook = function(req,res){
	Room.findOne({
		num : req.params.room_num
	},function(err,room){
		console.log("UUUUUUU " + room);
		room.ifbook = false;
		room.save();
		res.send({
			room : room,
			success : true
		});
	});
}
