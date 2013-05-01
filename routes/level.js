
var Level = require('../models/Level');


//post
exports.add = function(req, res){
	console.log('recieve name: ' + req.body['name']);
	console.log('recieve num: ' + req.body['num']);
	console.log('recieve price: ' + req.body['price']);
    Level.findOne({name :req.body['name']},function(err,level){
	  	if(!!level){ 
	  		level.name = req.body['name']; 		
			level.num =req.body['num'];
			level.price = req.body['price'];
			level.save();
			res.send({
				success : true,
				level : level
			})
		}else if(!level){
		  	level = new Level({
		  		name : req.body['name'],
		  	    num : req.body['num'],
		  	    price : req.body['price']
		    });
		    level.save();
		    res.send({ 
				success : true,
				level : level
			});
		}
	  }); 
};

//get
exports.delete = function(req,res){
	console.log('remove: ' + req.params.id);
	Level.findById(req.params.id,function(err,level){
		console.log("remove: " + level);
		level.remove();
		res.send({
			level : level,
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
