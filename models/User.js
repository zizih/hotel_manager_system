
var mongoose = require('./mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var UserSchema = mongoose.Schema({
	id : ObjectId,
	name : String,
	cardId : String,
	passwd : String,
	roleId : {}
});

var User = mongoose.model('user', UserSchema);

module.exports = User;
