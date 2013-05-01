
/*
 * GET home page.
 */

var Room = require('../models/Room');
var Role = require('../models/Role');
var Level = require('../models/Level');

exports.index = function(req, res){
	Room.find({},function(err,rooms){
		Room.find({ifbook : false},function(err,unbookrooms){
			Room.find({ifbook : true},function(err,bookrooms){
				Role.find({},function(err,roles){
					Level.find({},function(err,levels){
						res.render('index',{
							title : 'Home',
							rooms : rooms,
							unbookrooms : unbookrooms,
							bookrooms : bookrooms,
							iflogin : false,
							roles : roles,
							levels : levels 
						});
					});
				});
			});
		});
	});
};
