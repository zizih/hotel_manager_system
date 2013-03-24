
var mongoose = require('./mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var RoomSchema = mongoose.Schema({
	num: int,
	ifuse: boolean,
	startime: String,
	entime: String
});
var Room = mongoose.model('room', RoomSchema);

module.exports = Room;
