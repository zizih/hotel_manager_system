
var mongoose = require('./mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var LevelSchema = mongoose.Schema({
	id : ObjectId,
	num : Number,
	name : String,
	price : Number
});
var Level = mongoose.model('level', LevelSchema);

module.exports = Level;