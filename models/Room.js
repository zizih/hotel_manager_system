
var mongoose = require('./mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var RoomSchema = mongoose.Schema({
	id : ObjectId,
	num : Number,
	level_id : ObjectId,
	ifbook : Boolean,
	starttime : String,
	endtime : String,
	user_id : ObjectId
});
var Room = mongoose.model('room', RoomSchema);

module.exports = Room;
