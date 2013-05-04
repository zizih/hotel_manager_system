
var mongoose = require('./mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var RoomSchema = mongoose.Schema({
	id : ObjectId,
	num : Number,
	level : {},
	ifbook : Boolean,
	starttime : String,
	endtime : String,
	user : {} 
});

var Room = mongoose.model('room', RoomSchema);
module.exports = Room;
