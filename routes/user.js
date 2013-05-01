/*
 * GET users listing.
 */

var User = require('../models/User');
var Role = require('../models/Role');
var cUser;
var	ifLogin = false;

//get
exports.index = function(req,res) {
	Role.find({},function(err,roles){
		!err && res.render('user',{
			title : 'u',
			ifLogin : ifLogin,
			roles : roles
		});
	});
}

//post
exports.login = function(req, res) {
	User.findOne({
		name : req.body['name'],
		passwd : req.body['passwd']
	},function(err,user){
		if(!!user){
			cUser = user;
			Role.findById(user.roleId,function(err,role){
				console.log("role: " + role);
				res.send({
					title : "welcome " + cUser.name,
					ifLogin : true,
					user : user,
					role : role
				});
			});
		}
	});
}

exports.logout = function(req, res) {
	ifLogin = false;
	res.send({
		title : 'welcome' + usr.name
	});
}

//post
exports.reg = function(req, res) {
	Role.findOne({name : req.body['role']},function(err,role){
		var user = new User({
			name : req.body['name'],
			passwd : req.body['passwd'],
			cardId : req.body['card_id'],
			roleId : role._id
		});
		user.save();
		cUser = user;
		res.send({
			success : true,
			user : user	,
			role : role
		});
	});
}
