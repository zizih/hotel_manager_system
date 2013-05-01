
var mongoose = require('./mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var RoleSchema = mongoose.Schema({
	id : ObjectId,
	name : String
});

var Role = mongoose.model('role', RoleSchema);

module.exports = Role;
