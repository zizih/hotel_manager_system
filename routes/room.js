
var Room = require('../models/Room');


//post
exports.add = function(req, res){
	console.log('recieve num: ' + req.body['num']);
	console.log('recieve level: ' + req.body['level']);
	console.log('recieve id: ' + req.body['id']);
    Room.findOne({num :req.body['num']},function(err,room){
  	console.log(+'err: '+err);
  	console.log(!!room+'room: '+room);
  	if(!!room){  		
  		console.log(!!req.body['id']);
		room.num =req.body['num'];
		room.level = req.body['level'];
		room.save();
		res.send({
			success : true,
			room : room
		})
	}else if(!room){
	  	room = new Room({
	  	   num : req.body['num']
	  	   ,level : req.body['level']
	  	   ,ifbook : false
	    });
	    room.save();
	    res.send({ 
			success : true,
			room : room
		});
	}
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
	console.log(req.params);
	console.log(parseInt(req.params.room_num));
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
	console.log("Params: " + req.body);
	console.log("NUM: " + req.body['num']);
	Room.findOne({
		num : req.body['num']
	},function(err,room){
		console.log("before: "+room);
		room.level = parseInt(req.body['level']);
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
		room.ifbook = false;
		room.save();
		res.send({
			room : room,
			success : true
		});
	});
}
