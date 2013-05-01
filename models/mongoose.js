
var settings = require('../settings')
var mongoose = require('mongoose');
mongoose.connect(settings.db);


module.exports = mongoose;